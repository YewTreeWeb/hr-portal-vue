<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h2>{{ title }}</h2>
          <form action="#" id="addLeave" @submit.prevent="submitRequest">
            <div class="field">
              <label class="label">Date Submitted</label>
              <div class="control">
                <input
                  type="date"
                  class="input"
                  name="submitted"
                  value=""
                  placeholder="Add submitted date"
                  v-model="date"
                  @blur="validateInput"
                />
              </div>
              <p class="help">The date the leave was submitted to manager</p>
              <label class="label">Days</label>
              <div class="control">
                <input
                  type="number"
                  class="input"
                  name="amount"
                  step="any"
                  min="1"
                  value=""
                  placeholder="Number of days"
                  v-model="days"
                  @blur="validateInput"
                />
              </div>
              <p class="help">The amount of leave days requests</p>
              <label class="label">Leave Type</label>
              <div class="control">
                <div class="select">
                  <select
                    name="leaveType"
                    v-model="type"
                    @change="validateSelect"
                  >
                    <option v-bind:value="'null'" selected="selected"
                      >Choose type of leave</option
                    >
                    <option v-bind:value="'annual'">Annual Leave</option>
                    <option v-bind:value="'birthday'">Birthday Leave</option>
                    <option v-bind:value="'sick'">Sick Leave</option>
                    <option v-bind:value="'medical'">Medical Leave</option>
                  </select>
                </div>
              </div>
              <label class="label">Outcome</label>
              <div class="control">
                <div class="select">
                  <select
                    name="leaveOutcome"
                    v-model="status"
                    @change="validateSelect"
                  >
                    <option v-bind:value="'null'" selected="selected"
                      >Choose outcome of request</option
                    >
                    <option v-bind:value="'approved'">Approved</option>
                    <option v-bind:value="'pending'">Pending</option>
                    <option v-bind:value="'declined'">Declined</option>
                  </select>
                </div>
              </div>
              <p class="help">
                Has the leave request been approved/denied or still wating
                reponse?
              </p>
              <div class="control">
                <button class="button is-primary" type="submit">Submit</button>
              </div>
              <ul v-if="this.errors">
                <li v-if="errors.submit">
                  ERROR! Please submit valid data. E.g Do not leave blank fields
                </li>
                <li v-if="errors.input">
                  ERROR! Please enter valid data into the input field. E.g Do
                  not leave blank
                </li>
                <li v-if="errors.select">
                  ERROR! Please select a valid option. E.g Do not leave default
                  option
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LeaveRequest",
  props: {
    leaveRequests: Array
  },
  data() {
    return {
      title: "Leave Request",
      date: "",
      days: "",
      type: "",
      status: "",
      errors: {
        submit: false,
        input: false,
        select: false
      }
    };
  },
  methods: {
    submitRequest(payload) {
      if (
        this.date !== "" &&
        this.days !== "" &&
        this.type !== "null" &&
        this.status !== "null"
      ) {
        const formValues = {
          submitted: this.date,
          days: Number(this.days),
          type: this.type,
          outcome: this.status
        };
        this.leaveRequests.push(formValues);
        localStorage.setItem("formValues", JSON.stringify(this.leaveRequests));
        payload.target.reset();
      } else {
        this.errors.submit = !this.errors.submit;
      }
    },
    validateInput() {
      this.errors.submit = false;
      if (this.date === "" || this.days === "") {
        this.errors.input = !this.errors.input;
      } else {
        this.errors.input = false;
      }
    },
    validateSelect() {
      this.errors.submit = false;
      if (this.type === "null" || this.status === "null") {
        this.errors.select = !this.errors.select;
      } else {
        this.errors.select = false;
      }
    }
  }
};
</script>

<style lang="scss"></style>
