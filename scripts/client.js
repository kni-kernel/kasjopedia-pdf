const fs = require("fs");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("./protos/spz.proto", {keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const generatorProto = grpc.loadPackageDefinition(packageDefinition).spzgenerator;

function main() {
  const client = new generatorProto.SpzGeneratorService('localhost:5500', grpc.credentials.createInsecure());
  client.generateSpz({ content: JSON.stringify({ test: true }) }, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("resp", response);
    fs.writeFileSync("./test.pdf", response.blob);
  });
}

main();
