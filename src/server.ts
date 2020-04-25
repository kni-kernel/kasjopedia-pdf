import config from "config";
import fs from "fs";
import Koa from "koa";
import serve from "koa-static";
import mount from "koa-mount";
import * as path from "path";
import {generateSemesterPlan} from "@services/Generator";

const app = new Koa();

const staticPages = new Koa();
staticPages.use(serve(path.join(__dirname, "../frontend/dist")));

app.use(mount("/", staticPages));

export async function initServer(port: number) {
  return app.listen(port);
}

try {
  const port: number = config.get("app.koaPort");
  initServer(port);

  console.info(`Listening to http://localhost:${port}`);
  setTimeout(async () => {
    const pdfData = await generateSemesterPlan({ test: true });
    fs.writeFileSync("./test.pdf", pdfData);
  }, 2000);
} catch (err) {
  console.error(err);
}

export default app;
