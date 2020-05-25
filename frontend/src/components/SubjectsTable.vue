<template>
  <table class="subject-table">
    <tr>
      <td :colspan="colspan">
        <strong>{{ tableTitle }}</strong>
      </td>
    </tr>
    <tr>
      <td width="60%">
        Przedmiot
      </td>
      <td>
        Liczba godzin <br />
        W/C/L/P/S
      </td>
      <td>
        ECTS
      </td>
      <td v-if="withSemester">
        Semestr
      </td>
      <td class="subject-before-semester" v-if="withBeforeSemester">
        Zrealizowanie <br />w <br />
        semestrze
      </td>
      <td v-if="withFaculty">
        Wydział, na którym <br />
        prowadzony jest <br />
        przedmiot
      </td>
    </tr>
    <tr v-for="(subject, index) in subjects" :key="`subject_${index}`">
      <td>
        <strong>{{ subject.name }}</strong>
      </td>
      <td>
        {{ subject.hours }}
      </td>
      <td>
        {{ subject.ects }}
      </td>
      <td v-if="withSemester || withBeforeSemester">
        {{ subject.semester }}
      </td>
      <td v-if="withFaculty">
        {{ subject.faculty }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "SubjectsTable",
  props: {
    tableTitle: String,
    subjects: Array,
    withBeforeSemester: Boolean,
    withFaculty: Boolean,
    withSemester: Boolean
  },
  data() {
    return {
      colspan:
        3 + this.withFaculty + this.withSemester + this.withBeforeSemester
    };
  }
};
</script>

<style scoped>
.subject-table {
  border: 1px solid #000000;
  border-collapse: collapse;
  font-size: 7px;
  margin: 20px 0;
  text-align: center;
  vertical-align: bottom;
  width: 760px;
}

.subject-before-semester {
  -ms-writing-mode: tb-rl;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
  transform: rotate(270deg);
  white-space: nowrap;
  height: 50px;
}

table,
tr,
td {
  border: 1px solid #000000;
  padding: 10px;
}
</style>
