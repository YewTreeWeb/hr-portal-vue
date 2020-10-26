<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h2>{{ title }}</h2>
          <form action="#" id="addLeave" v-on:submit.prevent="submitRequest">
            <div class="field">
              <label class="label">Date Submitted</label>
              <div class="control">
                <input
                  type="date"
				  class="input"
                  name="submitted"
                  placeholder="Add submitted date"
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
                />
              </div>
              <p class="help">The amount of leave days requests</p>
              <label class="label">Leave Type</label>
              <div class="control">
                <div class="select">
                  <select name="leaveType">
                    <option value="" selected="selected"
                      >Choose type of leave</option
                    >
                    <option value="annual">Annual Leave</option>
                    <option value="birthday">Birthday Leave</option>
                    <option value="sick">Sick Leave</option>
                    <option value="medical">Medical Leave</option>
                  </select>
                </div>
              </div>
              <label class="label">Outcome</label>
              <div class="control">
                <div class="select">
                  <select name="leaveOutcome">
                    <option value="" selected="selected"
                      >Choose outcome of request</option
                    >
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="declined">Declined</option>
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
      title: "Leave Request"
    };
  },
  methods: {
    submitRequest(payload) {
      const formValues = {
        submitted: payload.target.elements.submitted.value,
        days: payload.target.elements.amount.value,
        type: payload.target.elements.leaveType.value,
        outcome: payload.target.elements.leaveOutcome.value
      };
      this.leaveRequests.push(formValues);
      localStorage.setItem("formValues", JSON.stringify(formValues));
      payload.target.reset();
    }
  }
};
</script>

<style lang="scss"></style>
