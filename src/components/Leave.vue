<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column" v-for="(leave, index) in companyLeave" :key="index">
          <article>
            <h3>{{ leave.type | capitalise }} Leave</h3>
            <ul class="leave" v-if="leave.available">
              <li>
                <span class="leave__available" ref="leaveAvailable">{{
                  leave.available
                }}</span>
                days available
              </li>
              <li>
                <span class="leave__approved" ref="leaveApproved">{{
                  leave.approved
                }}</span>
                days approved
              </li>
              <li>
                <span class="leave__declined" ref="leaveDeclined">{{
                  leave.declined
                }}</span>
                days declined
              </li>
              <li v-if="leave.remaining">
                <span class="leave__remaining" ref="leaveRemaining">{{
                  leave.remaining
                }}</span>
                days remaining
              </li>
            </ul>
            <ul v-else>
              <li>
                <span class="leave__used" ref="leaveUsed">{{
                  leave.days
                }}</span>
                day/s used
              </li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Leave",
  props: {
    leaveRequests: Array
  },
  data() {
    return {
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
      ]
    };
  },
  filters: {
    capitalise: string => {
      const capitalFirst = string.charAt(0).toUpperCase();
      const noCaseTail = string.slice(1, string.length);
      return capitalFirst + noCaseTail;
    }
  },
  created() {
    if (process.env.NODE_ENV !== "production") {
      console.log("created hook");
    }
    this.$nextTick(() => {
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
    });
  }
};
</script>

<style lang="scss"></style>
