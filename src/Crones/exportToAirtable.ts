import Airtable from "airtable";
import { getWeeklySellCount } from "../Services/product.service";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
console.log(process.env.AIRTABLE_BASE);
Airtable.configure({ apiKey: process.env.AIRTABLE_KEY });
const base = Airtable.base(process.env.AIRTABLE_BASE as string);

export default async function (): Promise<void> {
  try {
    const data = await getWeeklySellCount();

    if (!data || !data.length)
      return console.log("no data to export this week");

    const currentData = await base("This Week Data")
      .select({ maxRecords: 10 })
      .all();

    if (currentData && currentData.length)
      await base("This Week Data").destroy(
        currentData.map((datum) => datum.id)
      );

    const res = await base("This Week Data").create(
      data?.map((item) => ({ fields: item }))
    );

    if (!res || res.length !== data.length) {
      const err: any = new Error(
        "unknown error happened in airtable integration"
      );
      err.data = res;
      throw err;
    }
  } catch (e) {
    console.log(e);
  }
}
