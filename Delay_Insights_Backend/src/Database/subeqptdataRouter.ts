import express from "express";
import authMiddleware from "../Authentication/authMiddleware";
import { db } from "./connection";
const router = express.Router();

// @ts-ignore
router.get("/fetch-sub-eqpt-wise-data", authMiddleware, async (req, res) => {
  const query = `select 
                se.sub_eqpt_code,
                s.shop,
                e.eqpt,
                se.sub_eqpt
                from 
                	shop_eqpt_map shm
                join shop_data s 
                	on s.shop_code = shm.shop_code
                join eqpt_data e 
                	on e.eqpt_code = shm.eqpt_code
                join eqpt_sub_eqpt_map esm 
                	on esm.eqpt_code = shm.eqpt_code 
                join sub_eqpt_data se 
                	on se.sub_eqpt_code = esm.sub_eqpt_code`;

  try {
    const [sub_eqpt_data]: any = await db.query(query);

    res
      .status(200)
      .json({ message: "sub eqpt data sent successfully", sub_eqpt_data });
  } catch (error) {
    console.log("Error while fetching sub eqpt data", error);
    res.status(500).json({ message: "Internal server error..!" });
  }
});

export default router;
