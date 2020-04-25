import config from "config";
import puppeteer from "puppeteer";

import SemesterPlan from "@interfaces/SemesterPlan";

/**
 * Generates Semester Plan and returns as BLOB
 * @param planData
 */
export const generateSemesterPlan = async (
  planData: SemesterPlan
): Promise<Buffer> => {
  try {
    const dataBuffer = Buffer.from(JSON.stringify(planData));
    const base64encodedData = encodeURIComponent(dataBuffer.toString("base64"));
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        // Required for Docker version of Puppeteer
        "--no-sandbox",
        "--disable-setuid-sandbox",
        // This will write shared memory files into /tmp instead of /dev/shm,
        // because Docker’s default for /dev/shm is 64MB
        "--disable-dev-shm-usage"
      ]
    });
    const page = await browser.newPage();
    await page.goto(
      `http://localhost:${config.get(
        "app.koaPort"
      )}/?data=${base64encodedData}`,
      {
        waitUntil: "networkidle2"
      }
    );
    const buffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        left: "0px",
        top: "0px",
        right: "0px",
        bottom: "0px"
      }
    });

    await browser.close();

    return buffer;
  } catch (err) {
    console.error(
      `[generateSemesterPlan()] Failed to generate semester plan with data ${planData}. ${err.message}`
    );
    throw new Error(err);
  }
};
