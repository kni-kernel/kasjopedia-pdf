<template>
  <VGrid>
    <VRow>
      <VCol variant="xs-6">
        <PersonalData
          :first-name="planData.firstName"
          :last-name="planData.lastName"
          :field-of-study="planData.fieldOfStudy"
          :album="planData.album"
          :study-degree="planData.studyDegree"
          :email="planData.email"
        />
      </VCol>
      <VCol variant="xs-6">
        <VText variant="xs-right">
          Kraków, dnia {{ new Date().toLocaleDateString("pl-PL") }}
        </VText>
      </VCol>
    </VRow>
    <VRow>
      <VCol variant="xs-12">
        <VText class="ft11" variant="xs-right">
          <strong>
            Prodziekan ds. studenckich <br />
            dr. inż. Katarzyna MATUSIAK
          </strong>
        </VText>
      </VCol>
    </VRow>
    <VRow>
      <VCol variant="xs-12">
        Proszę o wpisanie mnie na
        <strong>{{ romanize(planData.semester) }}</strong> semestr studiów w
        roku akademickim <strong>{{ planData.studyYear }}</strong>
        <template v-if="planData.deficitSubjects.length > 0">
          z łącznym deficytem
          <strong>{{ ectsDeficit }}</strong> punktów ECTS
        </template>
        zatwierdzenie poniższego semestralnego planu zajęć.
      </VCol>
    </VRow>
    <VRow v-if="planData.deficitSubjects.length > 0">
      <VCol variant="xs-12">
        <SubjectsTable
          table-title="Przedmioty stanowiące deficyt ECTS"
          :subjects="planData.deficitSubjects"
          :with-before-semester="false"
          :with-faculty="true"
          :with-semester="true"
        />
      </VCol>
    </VRow>
    <VRow v-if="planData.regularSubjects.length > 0">
      <VCol variant="xs-12">
        <VText class="ft14" variant="xs-center">
          <strong>Semestralny plan zajęć</strong>
        </VText>
        <SubjectsTable
          table-title="Przedmioty obowiązkowe"
          :subjects="planData.regularSubjects"
          :with-before-semester="false"
          :with-faculty="false"
          :with-semester="false"
        />
      </VCol>
    </VRow>
    <VRow v-if="planData.electiveSubjects.length > 0">
      <VCol variant="xs-12">
        <SubjectsTable
          table-title="Przedmioty obieralne"
          :subjects="planData.electiveSubjects"
          :with-before-semester="false"
          :with-faculty="true"
          :with-semester="false"
        />
      </VCol>
    </VRow>
    <VRow v-if="planData.additionalSubjects.length > 0">
      <VCol variant="xs-12">
        <SubjectsTable
          table-title="Przedmioty dodatkowe spoza planu studiów"
          :subjects="planData.additionalSubjects"
          :with-before-semester="false"
          :with-faculty="true"
          :with-semester="false"
        />
      </VCol>
    </VRow>
    <VRow v-if="planData.previousSemesterSubjects.length > 0">
      <VCol variant="xs-12">
        <SubjectsTable
          table-title="Przedmioty zrealizowane w semestrach poprzednich"
          :subjects="planData.previousSemesterSubjects"
          :with-before-semester="true"
          :with-faculty="true"
          :with-semester="false"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol variant="xs-12">
        <VText variant="xs-right"> Razem ECTS: {{ ectsSum }} </VText>
        <VText variant="xs-right"> Łączna ilość godzin: {{ hoursSum }} </VText>
      </VCol>
    </VRow>
    <VRow v-if="repeatedSubjects.length > 0">
      <VCol variant="xs-12">
        <SubjectsTable
          table-title="Przedmioty powtarzane"
          :subjects="repeatedSubjects"
          :with-before-semester="false"
          :with-faculty="true"
          :with-semester="true"
        />
      </VCol>
    </VRow>
    <VRow v-if="planData.noAttendence.length > 0">
      Proszę o zwolnienie z obowiązku ponownego udziału w poniższych zajęciach:
      <br />
      <VCol variant="xs-12">
        <NoAttendenceTable />
      </VCol>
    </VRow>
    <VRow>
      <VCol variant="xs-12">
        <VText variant="xs-right">
          {{ planData.firstName }} {{ planData.lastName }}
        </VText>
      </VCol>
    </VRow>
  </VGrid>
</template>

<script>
import PersonalData from "./components/PersonalData";
import SubjectsTable from "./components/SubjectsTable";
import NoAttendenceTable from "./components/NoAttendenceTable";

export default {
  name: "App",
  components: {
    NoAttendenceTable,
    SubjectsTable,
    PersonalData
  },
  computed: {
    ectsSum() {
      return (
        this.planData &&
        this.countEctsForArray(this.planData.regularSubjects) +
          this.countEctsForArray(this.planData.electiveSubjects) +
          this.countEctsForArray(this.planData.additionalSubjects) +
          this.countEctsForArray(this.planData.previousSemesterSubjects)
      );
    },
    ectsDeficit() {
      return (
        this.planData && this.countEctsForArray(this.planData.deficitSubjects)
      );
    },
    hoursSum() {
      return (
        this.planData &&
        this.countHoursForArray(this.planData.regularSubjects) +
          this.countHoursForArray(this.planData.electiveSubjects) +
          this.countHoursForArray(this.planData.additionalSubjects) +
          this.countHoursForArray(this.planData.previousSemesterSubjects)
      );
    },
    planData() {
      return JSON.parse(
        decodeURIComponent(
          atob(new URL(location.href).searchParams.get("data"))
            .split("")
            .map(function(c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        )
      );
    },
    repeatedSubjects() {
      return (
        this.planData &&
        this.planData.deficitSubjects.filter(subject => subject.doingNow)
      );
    }
  },
  methods: {
    countEctsForArray(arr) {
      return arr.reduce((acc, val) => acc + val.ects, 0);
    },
    countHoursForArray(arr) {
      return arr.reduce(
        (acc, val) =>
          acc +
          val.hours.split("/").reduce((acc, val) => acc + parseInt(val, 10), 0),
        0
      );
    },
    romanize(num) {
      if (isNaN(num)) return NaN;
      const digits = String(+num).split(""),
        key = [
          "",
          "C",
          "CC",
          "CCC",
          "CD",
          "D",
          "DC",
          "DCC",
          "DCCC",
          "CM",
          "",
          "X",
          "XX",
          "XXX",
          "XL",
          "L",
          "LX",
          "LXX",
          "LXXX",
          "XC",
          "",
          "I",
          "II",
          "III",
          "IV",
          "V",
          "VI",
          "VII",
          "VIII",
          "IX"
        ];
      let roman = "",
        i = 3;
      while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
      return Array(+digits.join("") + 1).join("M") + roman;
    }
  }
};
</script>

<style>
body {
  font-family: Verdana, sans-serif;
  color: #000000;
  font-size: 10px;
}
.ft11 {
  font-size: 11px;
}
.ft14 {
  font-size: 14px;
}
</style>

<style scoped></style>
