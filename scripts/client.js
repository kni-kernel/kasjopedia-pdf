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

  const content = {
    album: 297893,
    email: "piotr@moszkowicz.pl",
    fieldOfStudy: "IS",
    firstName: "Piotr",
    lastName: "Moszkowicz",
    semester: 5,
    studyDegree: 1,
    studyYear: "2019/20",
    deficitSubjects: [
      {
        name: "Teoria obwodów i sygnałów",
        hours: "15/30/0/0/0",
        ects: 3,
        semester: 3,
        faculty: "WFiIS",
        doingNow: true
      }
    ],
    regularSubjects: [
      {
        name: "Komputeryzacja pomiarów",
        hours: "15/0/15/15/0",
        ects: 3
      },
      {
        name: "Bazy Danych 1",
        hours: "30/0/26/4/0",
        ects: 5
      },
      {
        name: "Inżynierskie metody numeryczne",
        hours: "30/0/30/0/0",
        ects: 5
      },
      {
        name: "Programowanie obiektowe 2",
        hours: "30/0/30/0/0",
        ects: 5
      }
    ],
    electiveSubjects: [
      {
        name: "Techniki Internetowe",
        hours: "30/0/26/4/0",
        ects: 6,
        faculty: "WFiIS"
      },
      {
        name: "Analiza Obrazów",
        hours: "30/0/15/15/0",
        ects: 6,
        faculty: "WFiIS"
      },
      {
        name: "Programowanie sieciowe i cyberbezpieczeństwo",
        hours: "14/0/16/8/0",
        ects: 3,
        faculty: "WFiIS"
      },
      {
        name: "Zaawansowane techniki programowania",
        hours: "0/0/20/20/20",
        ects: 6,
        faculty: "WFiIS"
      }
    ],
    additionalSubjects: [],
    previousSemesterSubjects: [],
    noAttendence: []
  };

  client.generateSpz({ content: JSON.stringify(content) }, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("resp", response);
    fs.writeFileSync("./test.pdf", response.blob);
  });
}

main();
