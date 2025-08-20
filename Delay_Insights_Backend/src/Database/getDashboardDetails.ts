import dayjs from "dayjs";
import { db } from "./connection";

export async function getSummary() {
  const today = dayjs().format("YYYY-MM-DD");

  const query = `
    SELECT
    (SELECT COUNT(*) FROM delays WHERE delay_date = ?) AS totalDelaysToday,

    (SELECT ROUND(SUM(eff_durn), 2) FROM delays) AS cumulativeDelayHours,

    (SELECT delay_code FROM delays WHERE delay_code IS NOT NULL GROUP BY delay_code ORDER BY COUNT(*) DESC LIMIT 1) AS mostFrequentCause,

    (SELECT shop FROM delays GROUP BY shop ORDER BY COUNT(*) LIMIT 1) AS departmentWithMinDelays,

    (SELECT shop FROM delays GROUP BY shop ORDER BY COUNT(*) DESC LIMIT 1) AS departmentWithMaxDelays,

    (SELECT ROUND(AVG(eff_durn), 2) FROM delays) AS mttr
  `;

  const [rows]: any = await db.query(query, [today]);
  const [descrData]: any = await db.query(
    ` SELECT descr FROM (SELECT descr FROM delays WHERE delay_code = ?) as sub GROUP BY descr ORDER BY COUNT(*) DESC LIMIT 1;`,
    [rows[0].mostFrequentCause]
  );

  const mostFreqObject = {
    delay_code: rows[0].mostFrequentCause,
    descr: descrData[0].descr,
  };

  console.log(mostFreqObject);
  console.log(rows);
  rows[0].mostFrequentCause = mostFreqObject;
  return rows[0];
}

export async function getMonthlyDelays() {
  const now = dayjs();
  const year = now.year();
  const month = now.month() + 1;
  let query = "SELECT ";
  let ranges: string[] = [];
  const monthsObj: Record<number, string> = {
    1: "Jan",
    2: "Feb",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "Sept",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  for (let i = 1; i <= month; i++) {
    if (i < month) {
      query = `${query} (select COALESCE(sum(eff_durn),0) as total_delay_time from delays where delay_date between ? and LAST_DAY(?)) as ${monthsObj[i]},`;
    } else {
      query = `${query} (select COALESCE(sum(eff_durn),0) as total_delay_time from delays where delay_date between ? and LAST_DAY(?)) as ${monthsObj[i]};`;
    }

    ranges.push(`${year + "-" + i + "-01"}`);
    ranges.push(`${year + "-" + i + "-01"}`);
  }

  const [rows]: any = await db.query(query, ranges);
  console.log(rows);
  return rows[0];
}

export async function getWeeklyDelays() {
  const now = dayjs();
  const year = now.year();
  const month = now.month();

  const query = `
    select 
        (select COALESCE(sum(eff_durn),0) as total_delay_time from delays where delay_date between ? and ?) as first,

        (select COALESCE(sum(eff_durn),0) as total_delay_time from delays where delay_date between ? and ?) as second,

        (select COALESCE(sum(eff_durn),0) as total_delay_time from delays where delay_date between ? and ?) as third,

        (select COALESCE(sum(eff_durn),0) as total_delay_time from delays where delay_date between ? and ?) as fourth,

        (select COALESCE(sum(eff_durn),0) as total_delay_time from delays where delay_date between ? and LAST_DAY(?)) as other;
    `;

  const ranges = [
    `${year + "-" + month + "-01"}`,
    `${year + "-" + month + "-07"}`,
    `${year + "-" + month + "-08"}`,
    `${year + "-" + month + "-14"}`,
    `${year + "-" + month + "-15"}`,
    `${year + "-" + month + "-21"}`,
    `${year + "-" + month + "-22"}`,
    `${year + "-" + month + "-28"}`,
    `${year + "-" + month + "-29"}`,
    `${year + "-" + month + "-29"}`,
  ];

  const [rows]: any = await db.query(query, ranges);
  console.log(rows);
  return rows[0];
}

export async function getYearlyDelays() {
  const now = dayjs();
  const year = now.year();

  const query = `
        select 
            (select COALESCE(sum(eff_durn),0) as total_delay_time from delays where delay_date between ? and ?) as ${(
              year - 4
            )
              .toString()
              .concat("year")},
            (select COALESCE(sum(eff_durn),0) as total_delay_time from delays where delay_date between ? and ?) as ${(
              year - 3
            )
              .toString()
              .concat("year")},
            (select COALESCE(sum(eff_durn),0) as total_delay_time from delays where delay_date between ? and ?) as ${(
              year - 2
            )
              .toString()
              .concat("year")},
            (select COALESCE(sum(eff_durn),0) as total_delay_time from delays where delay_date between ? and ?) as ${(
              year - 1
            )
              .toString()
              .concat("year")},
            (select COALESCE(sum(eff_durn),0) as total_delay_time from delays where delay_date between ? and ?) as ${year
              .toString()
              .concat("year")};
    `;

  const ranges = [
    `${year - 4 + "-01-01"}`,
    `${year - 4 + "-12-31"}`,
    `${year - 3 + "-01-01"}`,
    `${year - 3 + "-12-31"}`,
    `${year - 2 + "-01-01"}`,
    `${year - 2 + "-12-31"}`,
    `${year - 1 + "-01-01"}`,
    `${year - 1 + "-12-31"}`,
    `${year + "-01-01"}`,
    `${year + "-12-31"}`,
  ];

  ranges.forEach((range) => {
    console.log(range);
  });

  const [rows]: any = await db.query(query, ranges);
  console.log(rows);
  return rows[0];
}
