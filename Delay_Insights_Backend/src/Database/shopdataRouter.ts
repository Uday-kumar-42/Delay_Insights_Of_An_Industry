import express from "express";
import authMiddleware from "../Authentication/authMiddleware";
import { db } from "./connection";
const router = express.Router();

// @ts-ignore
router.get("/fetch-shop-list", authMiddleware, async (req, res) => {
  const query = `select shop_code,shop from shop_data`;

  try {
    const [shop_list_data]: any = await db.query(query);

    res
      .status(200)
      .json({ message: "shop list data sent successfully", shop_list_data });
  } catch (error) {
    console.log("Error while fetching shop list data", error);
    res.status(500).json({ message: "Internal server error..!" });
  }
});

// @ts-ignore
router.get("/fetch-shop-wise-data", authMiddleware, async (req, res) => {
  const query1 = `select shop_code,shop,abbreviation from shop_data;`;
  const query2 = `select s.shop_code,e.eqpt 
                from shop_eqpt_map s
                join eqpt_data e on e.eqpt_code = s.eqpt_code;`;
  const query3 = `select shop_code , count(*) as total_delays , round(sum(eff_durn),2) as downtime from delays group by shop_code;`;

  try {
    const [shop_data]: any = await db.query(query1);
    const [shop_eqpt_map]: any = await db.query(query2);
    const [delay_shop_data]: any = await db.query(query3);

    res.status(200).json({
      message: "shop wise data sent successfully",
      shop_data,
      shop_eqpt_map,
      delay_shop_data,
    });
  } catch (error) {
    console.log("Error while fetching shop wise data", error);
    res.status(500).json({ message: "Internal server error..!" });
  }
});

// @ts-ignore
router.get("/fetch-selected-shop-data", authMiddleware, async (req, res) => {
  try {
    // Normalize query parameters to always be arrays
    const shopsRaw = req.query.shops;
    const eqptsRaw = req.query.eqpts;

    // @ts-ignore
    const shops: string[] = Array.isArray(shopsRaw)
      ? shopsRaw
      : typeof shopsRaw === "string"
      ? [shopsRaw]
      : [];

    // @ts-ignore
    const eqpts: string[] = Array.isArray(eqptsRaw)
      ? eqptsRaw
      : typeof eqptsRaw === "string"
      ? [eqptsRaw]
      : [];

    console.log("Shops:", shops);
    console.log("Eqpts:", eqpts);

    if (shops.length === 0) {
      res.status(400).json({ message: "Essential values are not provided" });
      return;
    }

    const params: string[] = [];
    const shopPlaceholders = shops.map(() => "?").join(",");
    params.push(...shops);

    let query = "";

    if (eqpts.length > 0) {
      const eqptPlaceholders = eqpts.map(() => "?").join(","); 
      query = `
        SELECT shop, eqpt, sub_eqpt, descr, delay_code, eff_durn 
        FROM delays 
        WHERE shop IN (${shopPlaceholders}) 
        AND eqpt IN (${eqptPlaceholders});
      `;
      params.push(...eqpts);
    } else {
      query = `
        SELECT shop, eqpt, sub_eqpt, descr, delay_code, eff_durn 
        FROM delays 
        WHERE shop IN (${shopPlaceholders});
      `;
    }

    console.log("Final SQL Query:", query);
    const [shop_data] = await db.query(query, params);

    res.status(200).json({ message: "Shop data sent successfully", shop_data });
  } catch (error) {
    console.error("Error while fetching shop data", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
