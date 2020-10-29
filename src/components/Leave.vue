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
              <li v-if="leave.type === 'annual' || leave.type === 'birthday'">
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
    companyLeave: Array
  },
  data() {
    return {
      title: "Company Leave Amounts"
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
    this.$nextTick(() => {});
  }
};
</script>

<style lang="scss"></style>
