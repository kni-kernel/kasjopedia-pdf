<template>
  <table class="no-attendence-table">
    <tr>
      <td width="60%">
        Przedmiot
      </td>
      <td>
        Forma zajęć
      </td>
      <td>
        Data <br />
        zaliczenia
      </td>
      <td>
        Ocena
      </td>
      <td>
        Zgoda prowadzącego <br />
        przedmiot
      </td>
    </tr>
    <tr v-for="(subject, index) in subjects" :key="`subject_${index}`">
      <td>
        {{ subject.name }}
      </td>
      <td>
        {{ subject.form }}
      </td>
      <td>
        {{ subject.date }}
      </td>
      <td>
        {{ subject.grade }}
      </td>
      <td>
        {{ subject.allowance }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "NoAttendenceTable",
  props: {
    subjects: Array
  }
};
</script>

<style scoped>
.no-attendence-table {
  border: 1px solid #000000;
  border-collapse: collapse;
  font-size: 7px;
  margin: 20px 0;
  text-align: center;
  vertical-align: bottom;
  width: 760px;
}

table,
tr,
td {
  border: 1px solid #000000;
  padding: 10px;
}
</style>
