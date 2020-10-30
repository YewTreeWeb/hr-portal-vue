<template>
  <div id="app">
    <Hero :title="heading" :subtitle="`${name} - ${role} at ${company}`" />
    <Leave :companyLeave="companyLeave" />
    <LeaveLog
      :leaveRequests="leaveRequests"
      :error="error"
      @delete="deleteRequest"
      @update="updateRequest"
    />
    <LeaveRequest
      :leaveRequests="leaveRequests"
      @submittedValues="formSubmitted"
    />
  </div>
</template>

<script>
import localforage from "localforage";
import { openDB } from "idb";
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
      localStorageKey: false,
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
    updateValues(el) {
      const days = Number(el.days);
      if (el.type === "annual" || el.type === "birthday") {
        const leaveType =
          el.type === "annual" ? this.companyLeave[0] : this.companyLeave[1];
        if (el.status === "approved") {
          leaveType.approved = Number(leaveType.approved) + days;
          leaveType.remaining = Number.isInteger(leaveType.remaining)
            ? leaveType.remaining - days
            : (leaveType.remaining - days).toFixed(1);
        } else {
          leaveType.declined = Number(leaveType.declined) + days;
        }
      } else if (el.type === "sick") {
        this.companyLeave[2].days = Number(this.companyLeave[2].days) + days;
      } else if (el.type === "medical") {
        this.companyLeave[3].days = Number(this.companyLeave[3].days) + days;
      }
    },
    formSubmitted(payload) {
      console.log(payload);
      this.updateValues(payload);
    },
    deleteRequest(payload) {
      this.leaveRequests = this.leaveRequests.filter(request => {
        return request.id !== payload.id;
      });
      localforage.setItem("formValues", this.leaveRequests);
    },
    updateRequest(payload) {
      this.leaveRequests.forEach(request => {
        if (request.id === payload.id) {
          if (request.days !== payload.days && payload.days !== "") {
            request.days = payload.days;
          } else if (
            request.status !== payload.status &&
            payload.status !== ""
          ) {
            request.status = payload.status;
          }
          if (process.env.NODE_ENV !== "production" && window.console) {
            console.log(request);
          }
        }
      });
      localforage.setItem("formValues", this.leaveRequests);
    },
    async checkStoredKey() {
      const storeName = "keyvaluepairs";
      const key = "formValues";
      const db = await openDB("localforage");
      if (db.objectStoreNames.contains(storeName)) {
        const tx = db.transaction(storeName);
        const store = await tx.objectStore(storeName);
        const checkKey = await store.get(key);
        const checkKeys = await store.getAllKeys();

        if (checkKey !== undefined) {
          this.localStorageKey = !this.localStorageKey;
        }

        if (process.env.NODE_ENV !== "production" && window.console) {
          console.log(db.objectStoreNames);
          console.log({ checkKeys, checkKey });
          console.log("localkey is", this.localStorageKey);
        }
      }
    }
  },
  mounted() {
    this.checkStoredKey()
      .then(() => {
        if (typeof localStorage !== "undefined" && this.localStorageKey) {
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
              if (process.env.NODE_ENV !== "production" && window.console) {
                console.log("localforage is mounted");
              }
            })
            .then(() => {
              // Get the saved requests and update the companyLeave values
              if (this.leaveRequests.length > 0) {
                console.log(this.leaveRequests);
                this.leaveRequests.forEach(request => {
                  this.updateValues(request);
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
      })
      .catch(error => console.error(error));
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
  @each $heading, $size in $headings {
    #{$heading} {
      @include make-font-size($size);
      font-family: $font-family-header;
      font-weight: $weight;
    }
  }
}
</style>
