<template>
  <table class="personal-data">
    <tr>
      <td>
        <VText variant="md-right">
          Nazwisko:
        </VText>
      </td>
      <td>
        {{ lastName }}
      </td>
    </tr>
    <tr>
      <td>
        <VText variant="md-right">
          Imię:
        </VText>
      </td>
      <td>
        {{ firstName }}
      </td>
    </tr>
    <tr>
      <td>
        <VText variant="md-right">
          Nr Albumu:
        </VText>
      </td>
      <td>
        {{ album }}
      </td>
    </tr>
    <tr>
      <td>
        <VText variant="md-right">
          Kierunek Studiów:
        </VText>
      </td>
      <td>
        {{ fieldOfStudy }}
      </td>
    </tr>
    <tr>
      <td>
        <VText variant="md-right">
          Studia stopnia:
        </VText>
      </td>
      <td>
        {{ studyDegree === 1 ? "pierwszego" : "drugiego" }}
      </td>
    </tr>
    <tr>
      <td>
        <VText variant="md-right">
          email:
        </VText>
      </td>
      <td>
        {{ email }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "PersonalData",
  props: {
    firstName: String,
    lastName: String,
    album: Number,
    fieldOfStudy: String,
    studyDegree: Number,
    email: String
  }
};
</script>

<style scoped>
tr > td:first-child {
  font-size: 12px;
}
tr {
  font-size: 10px;
}
</style>
