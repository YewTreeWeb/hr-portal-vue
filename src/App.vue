<template>
  <div id="app">
    <Hero :title="heading" :subtitle="`${name} - ${role} at ${company}`" />
    <Leave :leaveRequests="leaveRequests" />
    <LeaveLog :leaveRequests="leaveRequests" />
    <LeaveRequest :leaveRequests="leaveRequests" />
  </div>
</template>

<script>
import Hero from "./components/Hero";
import Leave from "./components/Leave";
import LeaveLog from "./components/LeaveLog";
import LeaveRequest from "./components/LeaveRequest";

export default {
  name: "App",
  data() {
    return {
      heading: "HR Portal",
      name: "Mathew Teague",
      role: "UI Developer",
      hired: "6th July 2020",
      department: "Development",
      company: "Textlocal",
      office: {
        area: "Malvern",
        link: "#"
      },
      location: {
        lat: 37.7749,
        lng: -122.4194
      },
      leaveRequests: []
    };
  },
  components: {
    Hero,
    Leave,
    LeaveLog,
    LeaveRequest
  },
  mounted() {
    if (localStorage.getItem("formValues")) {
      this.leaveRequests.push(JSON.parse(localStorage.getItem("formValues")));
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: quote(Barlow), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: inherit;
  @include padding(null null 30px);
  min-height: 100vh;
}
</style>
