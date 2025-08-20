import express from "express";
import authMiddleware from "../Authentication/authMiddleware";
import { db } from "./connection";
const router = express.Router();

// @ts-ignore
router.get("/fetch-eqpt-list", authMiddleware, async (req, res) => {
  const query = `select eqpt_code,eqpt from eqpt_data`;

  try {
    const [eqpt_list_data]: any = await db.query(query);

    res
      .status(200)
      .json({ message: "eqpt list data sent successfully", eqpt_list_data });
  } catch (error) {
    console.log("Error while fetching eqpt list data", error);
    res.status(500).json({ message: "Internal server error..!" });
  }
});

// @ts-ignore
router.get("/fetch-eqpt-wise-data", authMiddleware, async (req, res) => {
  const query1 = `select eqpt_code,eqpt from eqpt_data;`;
  const query2 = `select e.eqpt_code,s.sub_eqpt 
                  from eqpt_sub_eqpt_map e
                  join sub_eqpt_data s on s.sub_eqpt_code = e.sub_eqpt_code;`;
  const query3 = `with delay_data as
                  (
                  select eqpt , count(*) as total_delays , round(sum(eff_durn),2) as downtime 
                  from delays 
                  where eqpt is not null 
                  group by eqpt
                  )
                  select e.eqpt_code,d.total_delays,d.downtime
                  from eqpt_data e
                  join delay_data d on d.eqpt = e.eqpt;`;

  try {
    const [eqpt_data]: any = await db.query(query1);
    const [eqpt_sub_eqpt_map]: any = await db.query(query2);
    const [delay_eqpt_data]: any = await db.query(query3);

    res.status(200).json({
      message: "eqpt wise data sent successfully",
      eqpt_data,
      eqpt_sub_eqpt_map,
      delay_eqpt_data,
    });
  } catch (error) {
    console.log("Error while fetching eqpt wise data", error);
    res.status(500).json({ message: "Internal server error..!" });
  }
});

// @ts-ignore
router.get("/fetch-selected-eqpt-data", authMiddleware, async (req, res) => {
  try {
    // Normalize query parameters to always be arrays
    const eqptsRaw = req.query.eqpts;
    const sub_eqptsRaw = req.query.sub_eqpts;

    // @ts-ignore
    const eqpts: string[] = Array.isArray(eqptsRaw)
      ? eqptsRaw
      : typeof eqptsRaw === "string"
      ? [eqptsRaw]
      : [];

    // @ts-ignore
    const sub_eqpts: string[] = Array.isArray(sub_eqptsRaw)
      ? sub_eqptsRaw
      : typeof sub_eqptsRaw === "string"
      ? [sub_eqptsRaw]
      : [];

    console.log("Eqpts:", eqpts);
    console.log("SubEpts:", sub_eqpts);

    if (eqpts.length === 0) {
      res.status(400).json({ message: "Essential values are not provided" });
      return;
    }

    const params: string[] = [];
    const eqptPlaceholders = eqpts.map(() => "?").join(",");
    params.push(...eqpts);

    let query = "";

    if (sub_eqpts.length > 0) {
      const sub_eqptPlaceholders = sub_eqpts.map(() => "?").join(",");
      query = `
          SELECT eqpt, sub_eqpt, descr, delay_code, eff_durn 
          FROM delays 
          WHERE eqpt IN (${eqptPlaceholders}) 
          AND sub_eqpt IN (${sub_eqptPlaceholders});
        `;
      params.push(...sub_eqpts);
    } else {
      query = `
          SELECT eqpt, sub_eqpt, descr, delay_code, eff_durn 
          FROM delays 
          WHERE eqpt IN (${eqptPlaceholders});
        `;
    }

    console.log("Final SQL Query:", query);
    const [eqpt_data] = await db.query(query, params);

    res.status(200).json({ message: "Eqpt data sent successfully", eqpt_data });
  } catch (error) {
    console.error("Error while fetching eqpt data", error);
    res.status(500).json({ message: "Internal server error" });
  }
}); 

export default router;
