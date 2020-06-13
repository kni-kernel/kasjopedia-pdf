const fs = require("fs");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("./protos/spz.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const generatorProto = grpc.loadPackageDefinition(packageDefinition)
  .spzgenerator;

function main() {
  const client = new generatorProto.SpzGeneratorService(
    "localhost:5500",
    grpc.credentials.createInsecure()
  );

  const content = {
    album: "297893",
    email: "piotr@moszkowicz.pl",
    fieldOfStudy: "IS",
    firstName: "Piotr",
    lastName: "Moszkowicz",
    semester: 7,
    studyDegree: 1,
    studyYear: "2020/21",
    actualYear: "2020/21",
    deficitSubjects: [],
    regularSubjects: [
      {
        _id: "5ee4cc339887ad278e902057",
        name: "Praca dyplomowa",
        ects: 15,
        academicYear: "2017/2018",
        level: 1,
        fieldOfStudy: "IS",
        semester: 7,
        hours: "0/0/0/45/0/0",
        checkbox: true
      }
    ],
    electiveSubjects: [
      {
        _id: "5ee4cc359887ad278e902074",
        name: "Przetwarzanie danych w chmurach obliczeniowych",
        ects: 6,
        academicYear: "2017/2018",
        level: 1,
        fieldOfStudy: "IS",
        semester: 0,
        hours: "30/0/15/0/0/0",
        faculty: "WFiIS"
      },
      {
        _id: "5ee4cc359887ad278e902077",
        name: "Grafika 3D",
        ects: 6,
        academicYear: "2017/2018",
        level: 1,
        fieldOfStudy: "IS",
        semester: 0,
        hours: "30/0/30/0/0/0",
        faculty: "WFiIS"
      }
    ],
    additionalSubjects: [],
    previousSemesterSubjects: [],
    noAttendence: []
  };

  /* const content = {
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
  }; */

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
