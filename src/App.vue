<template>
  <div id="app">
    <Hero :title="heading" :subtitle="`${name} - ${role} at ${company}`" />
    <Leave :companyLeave="companyLeave" />
    <LeaveLog :leaveRequests="leaveRequests" :error="error" />
    <LeaveRequest
      :leaveRequests="leaveRequests"
      :submittedRequests="submittedRequests"
      @submittedValues="formSubmitted"
    />
  </div>
</template>

<script>
import localforage from "localforage";
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
      companyLeave: [
        {
          type: "annual",
          available: 25,
          approved: 0,
          declined: 0,
          remaining: 25
        },
        {
          type: "birthday",
          available: 1,
          approved: 0,
          declined: 0,
          remaining: 1
        },
        {
          type: "sick",
          days: 0
        },
        {
          type: "medical",
          days: 0
        }
      ],
      leaveRequests: [],
      submittedRequests: [],
      error: ""
    };
  },
  components: {
    Hero,
    Leave,
    LeaveLog,
    LeaveRequest
  },
  methods: {
    formSubmitted(payload) {
      console.log(payload);
    }
  },
  mounted() {
    if (typeof localStorage !== "undefined") {
      const savedRequests = async () => {
        const savedRequest = await localforage.getItem("formValues");

        // If there is an error, display error message
        if (savedRequest === null) {
          throw new Error("Can't get saved form values.");
        }

        return savedRequest;
      };
      savedRequests()
        .then(values => {
          const savedValues = values;
          savedValues.forEach(saved => {
            this.leaveRequests.push(saved);
          });
          console.log("localforage is mounted");
        })
        .then(() => {
          // Get the saved requests and update the companyLeave values
          const annual = this.companyLeave[0];
          const birthday = this.companyLeave[1];
          if (this.leaveRequests.length > 0) {
            this.leaveRequests.forEach(request => {
              if (request.type === "annual") {
                if (request.outcome === "approved") {
                  annual.approved = Number(annual.approved) + request.days;
                  annual.remaining = Number.isInteger(annual.remaining)
                    ? annual.remaining - request.days
                    : (annual.remaining - request.days).toFixed(2);
                } else {
                  annual.declined = Number(annual.declined) + request.days;
                }
              } else if (request.type === "birthday") {
                if (request.outcome === "approved") {
                  birthday.approved = Number(birthday.approved) + request.days;
                  birthday.remaining = Number.isInteger(birthday.remaining)
                    ? birthday.remaining - request.days
                    : (birthday.remaining - request.days).toFixed(2);
                } else {
                  birthday.declined = Number(birthday.declined) + request.days;
                }
              } else if (request.type === "sick") {
                this.companyLeave[2].days =
                  Number(this.companyLeave[2].days) + request.days;
              } else if (request.type === "medical") {
                this.companyLeave[3].days =
                  Number(this.companyLeave[3].days) + request.days;
              }
            });
          }
        })
        .catch(error => {
          this.error = error.message;
          if (window.console) {
            console.error(error);
          }
        });
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
