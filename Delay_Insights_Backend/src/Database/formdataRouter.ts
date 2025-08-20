import express from "express";
import authMiddleware from "../Authentication/authMiddleware";
import { db } from "./connection";
const router = express.Router();

// @ts-ignore
router.get("/fetch-form-data", authMiddleware, async (req, res) => {
  try {
    const shop_code = Number(req.query.shop_code);
    console.log(shop_code);
    console.log(typeof shop_code);

    const [shopRow]: any = await db.query(
      `select shop from shop_data where shop_code = ?;`,
      [shop_code]
    );

    const [eqpts]: any = await db.query(
      `select distinct(eqpt) from delays where shop_code = ? and eqpt is not null;`,
      [shop_code]
    );

    const [agencies]: any = await db.query(
      `select distinct(agency) from delays where shop_code = ? and agency is not null;`,
      [shop_code]
    );

    const [descrs]: any = await db.query(
      `select distinct(descr) from delays where shop_code = ? and descr is not null;`,
      [shop_code]
    );

    const [contds]: any = await db.query(
      `select distinct(contd) from delays where shop_code = ? and contd is not null;`,
      [shop_code]
    );

    const [materials]: any = await db.query(
      `select distinct(material) from delays where shop_code = ? and material is not null;`,
      [shop_code]
    );

    res.status(200).json({
      message: "Form data sent successfully",
      shop: shopRow[0].shop,
      eqpts,
      agencies,
      descrs,
      contds,
      materials,
    });
  } catch (error) {
    console.error("Error while fetching form data", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @ts-ignore
router.get("/fetch-form-sub-eqpt-data", authMiddleware, async (req, res) => {
  try {
    const eqpt = req.query.eqpt;
    const shop_code = req.query.shop_code;
    const query = `select distinct(sub_eqpt) from delays where shop_code = ? and eqpt = ? and sub_eqpt is not null;`;
    console.log(query);

    const [sub_eqpts]: any = await db.query(query, [shop_code, eqpt]);
    res
      .status(200)
      .json({ message: "Form Sub Eqpt data sent successfully", sub_eqpts });
  } catch (error) {
    console.error("Error while fetching form sub eqpt data", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @ts-ignore
router.get("/fetch-form-delay-code-data", authMiddleware, async (req, res) => {
  try {
    const descr = req.query.descr;
    const query = `select distinct(delay_code) from delays where descr = ? and delay_code is not null;`;
    console.log(query);

    const [delay_codes]: any = await db.query(query, [descr]);
    res
      .status(200)
      .json({ message: "Form Delay Code data sent successfully", delay_codes });
  } catch (error) {
    console.error("Error while fetching form delay code data", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @ts-ignore
router.post("/add-delay-data", authMiddleware, async (req, res) => {
  try {
    console.log(req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(401).json({ message: "Empty request body" });
      return;
    }

    const {
      agency,
      contd,
      delay_code,
      delay_date,
      descr,
      eff_durn,
      eqpt,
      freq,
      is_completed,
      material,
      rake,
      shop,
      shop_code,
      start,
      sub_eqpt,
      upto,
    } = req.body;

    const sql = `
  INSERT INTO delays (
    agency,
    contd,
    delay_code,
    delay_date,
    descr,
    eff_durn,
    eqpt,
    freq,
    is_completed,
    material,
    rake,
    shop,
    shop_code,
    start,
    sub_eqpt,
    upto
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

    const values = [
      agency,
      contd,
      delay_code,
      delay_date,
      descr,
      eff_durn,
      eqpt,
      freq,
      is_completed,
      material,
      rake,
      shop,
      shop_code,
      start,
      sub_eqpt,
      upto,
    ];

    const response: any = await db.execute(sql, values);

    if (response[0].affectedRows === 1) {
      res
        .status(200)
        .json({
          message: "Delay Inserted successfully",
          id: response[0].insertId,
        });
    } else {
      res.status(400).json({ message: "Insertion failed" });
    }
  } catch (error) {
    console.error("Error while inserting data", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
