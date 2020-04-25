<template>
  <div id="app">
    {{ planData }}
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    planData() {
      return JSON.parse(atob(new URL(location.href).searchParams.get("data")));
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
