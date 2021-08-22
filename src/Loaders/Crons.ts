import cron from "node-cron";
import exportToAirtable from "../Crones/exportToAirtable";

export default function setupCrones(): void {
  // Schedule tasks to be run on the server.
  cron.schedule("* * * * *", function () {
    console.log("running exportToAirtable task every week");
    exportToAirtable();
  });
}
