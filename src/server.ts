import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import config from "config";
import Koa from "koa";
import serve from "koa-static";
import mount from "koa-mount";
import * as path from "path";
import { generateSemesterPlan } from "@services/Generator";

const app = new Koa();

const staticPages = new Koa();
staticPages.use(serve(path.join(__dirname, "../frontend/dist")));

app.use(mount("/", staticPages));

export async function initServer(port: number) {
  return app.listen(port);
}

export async function initGrpcServer(port: number) {
  const packageDefinition = protoLoader.loadSync(
    `${__dirname}/../protos/spz.proto`,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    }
  );
  const generatorProto = grpc.loadPackageDefinition(packageDefinition)
    .spzgenerator;

  const server = new grpc.Server();

  // @ts-ignore
  server.addService(generatorProto.SpzGeneratorService.service, {
    generateSpz: async (call: any, callback: any) => {
      try {
        const payload = JSON.parse(call.request.content);
        const pdfData = await generateSemesterPlan(payload);
        callback(null, { blob: pdfData.toString() });
      } catch (err) {
        callback(err, null);
      }
    }
  });

  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.info(`Grpc running at 0.0.0.0:${port}`);
      return server.start();
    }
  );
}

try {
  const port: number = config.get("app.koaPort");
  const grpcPort: number = config.get("app.grpcPort");

  initServer(port);
  initGrpcServer(grpcPort);

  console.info(`Koa running at http://localhost:${port}`);
} catch (err) {
  console.error(err);
}

export default app;
