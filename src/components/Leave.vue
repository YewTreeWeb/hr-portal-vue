<template>
  <section class="section is-center">
    <div class="container">
      <div class="columns">
        <div class="column" v-for="(leave, index) in companyLeave" :key="index">
          <article class="card">
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
            <ul class="leave" v-else>
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
  }
};
</script>

<style lang="scss">
.is-center {
  text-align: center;
}
.leave {
  @include margin(20px null null);
  > li {
    @include margin(10px null 5px);
    &:first-child {
      font-weight: $weight-heavy;
      font-size: _heading((h6, 1));
      margin-top: 0;
    }
  }
}
</style>
