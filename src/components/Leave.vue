<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column" v-for="(leave, index) in companyLeave" :key="index">
          <article v-if="leave.type == 'annual'">
            <h3>{{ leave.type }} Leave</h3>
            <ul>
              <li>
                <span class="annual__available">{{ leave.available }}</span>
                days available
              </li>
              <li>
                <span class="annual__approved">{{ leave.approved }}</span> days
                approved
              </li>
              <li>
                <span class="annual__declined">{{ leave.declined }}</span> days
                declined
              </li>
              <li>
                <span class="annual__remaining">{{ leave.available }}</span>
                days remaining
              </li>
            </ul>
          </article>
          <article class="leave" v-else>
            <h4>{{ leave.type }} Leave</h4>
            <ul v-if="leave.available">
              <li>
                <span class="leave__available">{{ leave.available }}</span> day
                available
              </li>
              <li>
                <span class="leave__approved">{{ leave.approved }}</span> day
                approved
              </li>
              <li>
                <span class="leave__declined">{{ leave.declined }}</span> day
                declined
              </li>
            </ul>
            <ul v-else>
              <li>
                <span class="leave__used">{{ leave.days }}</span> days used
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
  data() {
    return {
      companyLeave: [
        {
          type: "Annual",
          available: 25,
          approved: 0,
          declined: 0
        },
        {
          type: "Birthday",
          available: 1,
          approved: 0,
          declined: 0
        },
        {
          type: "Sick",
          days: 0
        },
        {
          type: "Medical",
          days: 0
        }
      ]
    };
  }
};
</script>

<style lang="scss"></style>
