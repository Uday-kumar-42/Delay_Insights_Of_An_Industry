import express from "express";
import authMiddleware from "../Authentication/authMiddleware";
import { db } from "./connection";
import {
  getMonthlyDelays,
  getSummary,
  getWeeklyDelays,
  getYearlyDelays,
} from "./getDashboardDetails";

const router = express.Router();

// @ts-ignore
router.get("/fetch-summary", authMiddleware, async (req, res) => {
  try {
    const {
      totalDelaysToday,
      cumulativeDelayHours,
      mostFrequentCause,
      departmentWithMinDelays,
      departmentWithMaxDelays,
      mttr,
    } = await getSummary();
    res.status(200).json({
      message: "fetch-summary data sent",
      summary: {
        totalDelaysToday,
        cumulativeDelayHours,
        mostFrequentCause,
        departmentWithMinDelays,
        departmentWithMaxDelays,
        mttr,
      },
    });

    return;
  } catch (error) {
    console.log("Error while fetching Summary", error);
    res.status(500).json({ message: "Internal server error..!" });
  }
});

// @ts-ignore
router.get("/fetch-weekly-data", authMiddleware, async (req, res) => {
  try {
    const { first, second, third, fourth, other } = await getWeeklyDelays();

    res.status(200).json({
      message: "fetch-weekly data sent",
      data: {
        first,
        second,
        third,
        fourth,
        other,
      },
    });
  } catch (error) {
    console.log("Error while fetching Weekly data", error);
    res.status(500).json({ message: "Internal server error..!" });
  }
});

// @ts-ignore
router.get("/fetch-monthly-data", authMiddleware, async (req, res) => {
  try {
    const data = await getMonthlyDelays();

    res.status(200).json({
      message: "fetch-monthly data sent",
      data: data,
    });
  } catch (error) {
    console.log("Error while fetching Monthly data", error);
    res.status(500).json({ message: "Internal server error..!" });
  }
});

// @ts-ignore
router.get("/fetch-yearly-data", authMiddleware, async (req, res) => {
  try {
    const data = await getYearlyDelays();

    res.status(200).json({
      message: "fetch-yearly data sent",
      data: data,
    });
  } catch (error) {
    console.log("Error while fetching Yearly data", error);
    res.status(500).json({ message: "Internal server error..!" });
  }
});

// @ts-ignore
router.get("/fetch-shop-data", authMiddleware, async (req, res) => {
  try {
    const query =
      "select shop ,ROUND(SUM(eff_durn),2) as downtime from delays group by shop order by downtime desc;";
    const [data]: any = await db.query(query);

    console.log(data);

    res.status(200).json({
      message: "fetch-shop data sent",
      data: data,
    });
  } catch (error) {
    console.log("Error while fetching Shop data", error);
    res.status(500).json({ message: "Internal server error..!" });
  }
});

// @ts-ignore
router.get("/fetch-delay-code-data", authMiddleware, async (req, res) => {
  try {
    const query =`select delay_code,count(*) as total_delays 
                  from delays 
                  where delay_code is not null 
                  group by delay_code 
                  order by total_delays 
                  desc;`;

    const [data]: any = await db.query(query);

    res.status(200).json({
      message: "fetch-delay-code data sent",
      data: data,
    });
  } catch (error) {
    console.log("Error while fetching Delay Code data", error);
    res.status(500).json({ message: "Internal server error..!" });
  }
});

// @ts-ignore
router.get("/fetch-descr-data", authMiddleware, async (req, res) => {
  try {
    const query =
      "select descr , count(*) as descr_count from delays group by descr order by descr_count desc;";
    const [data]: any = await db.query(query);

    console.log(data);

    res.status(200).json({
      message: "fetch-descr data sent",
      data: data,
    });
  } catch (error) {
    console.log("Error while fetching Desription data", error);
    res.status(500).json({ message: "Internal server error..!" });
  }
});

// @ts-ignore
router.get("/fetch-eqpt-data", authMiddleware, async (req, res) => {
  try {
    const query =
      "select eqpt,count(eff_durn) as total_delays,sum(eff_durn) as downtime from delays where eqpt is not null group by eqpt order by downtime desc;";
    const [data]: any = await db.query(query);

    console.log(data);

    res.status(200).json({
      message: "fetch-eqpt data sent",
      data: data,
    });
  } catch (error) {
    console.log("Error while fetching Equipment data", error);
    res.status(500).json({ message: "Internal server error..!" });
  }
});

router.get(
  "/fetch-day-wise-data/:year/:month",
  // @ts-ignore
  authMiddleware,
  async (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const start_date = year + "-" + month + "-01";

    try {
      const query1 = `select DAY(delay_date) AS month_date,round(sum(eff_durn),2) as downtime 
                    from delays 
                    where delay_date between ? and LAST_DAY(?) 
                    group by month_date 
                    order by downtime 
                    desc;
                    `;

      const query2 = `with shop_wise_data as
                    (
                    select shop,count(*) as total_delays,round(sum(eff_durn)) as downtime
                    from delays
                    where delay_date between ? and LAST_DAY(?)
                    group by shop
                    )
                    select 
                    (select shop  from shop_wise_data order by total_delays desc limit 1) as shop_with_max_delays,
                    (select max(total_delays) from shop_wise_data) as total_delays,
                    (select shop from shop_wise_data order by downtime desc limit 1) as shop_with_most_downtime,
                    (select max(downtime) from shop_wise_data) as downtime;
                    `;

      const query3 = `with eqpt_wise_data as 
                    (
                    select eqpt,count(*) as total_delays,round(sum(eff_durn)) as downtime
                    from delays
                    where eqpt is not null and delay_date between ? and LAST_DAY(?)
                    group by eqpt
                    )
                    select 
                    (select eqpt from eqpt_wise_data order by total_delays desc limit 1) as eqpt_with_max_delays,
                    (select max(total_delays) from eqpt_wise_data) as total_delays,
                    (select eqpt from eqpt_wise_data order by downtime desc limit 1) as eqpt_with_most_downtime,
                    (select max(downtime) from eqpt_wise_data) as downtime;
                    `;

      const [day_wise_data]: any = await db.query(query1, [
        start_date,
        start_date,
      ]);
      const [shop_wise_data]: any = await db.query(query2, [
        start_date,
        start_date,
      ]);
      const [eqpt_wise_data]: any = await db.query(query3, [
        start_date,
        start_date,
      ]);

      console.log(day_wise_data);
      console.log(shop_wise_data);

      res.status(200).json({
        message: "fetch-day-wise data sent",
        day_wise_data: day_wise_data,
        shop_wise_data: shop_wise_data[0],
        eqpt_wise_data: eqpt_wise_data[0],
      });
    } catch (error) {
      console.log("Error while fetching Day wise data", error);
      res.status(500).json({ message: "Internal server error..!" });
    }
  }
);

export default router;
