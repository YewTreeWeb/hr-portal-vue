<template>
  <div class="columns">
    <div
      class="column"
      :class="{
        'm-r-15': index === 0,
        'm-r-15 m-l-15': index % 2,
      }"
      v-for="(leave, index) in filterdTypes"
      :key="index"
    >
      <article class="card">
        <h2>{{ leave.type | capitalise }} Leave</h2>
        <ul class="leave">
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
          <li>
            <span class="leave__remaining" ref="leaveRemaining">{{
              leave.remaining
            }}</span>
            days remaining
          </li>
        </ul>
      </article>
    </div>
    <div class="column m-l-15">
      <article class="card">
        <h2>Sick & Medical Leave</h2>
        <ul class="leave">
          <li v-for="(leave, index) in companyLeave" :key="index">
            <p v-if="leave.type !== 'birthday' && leave.type !== 'annual'">
              {{ leave.type }}
              <span class="leave__used" ref="leaveUsed">{{ leave.days }}</span>
            </p>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: "Leave",
  props: {
    companyLeave: Array,
  },
  data() {
    return {
      title: "Company Leave Amounts",
    };
  },
  computed: {
    filterdTypes() {
      return this.companyLeave.filter((leave) => {
        return leave.type !== "sick" && leave.type !== "medical";
      });
    },
  },
  filters: {
    capitalise: (string) => {
      const capitalFirst = string.charAt(0).toUpperCase();
      const noCaseTail = string.slice(1, string.length);
      return capitalFirst + noCaseTail;
    },
  },
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
