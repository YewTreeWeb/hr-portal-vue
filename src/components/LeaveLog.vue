<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h2>{{ title }}</h2>
          <div
			v-bind:id="`request-${index}`"
		  	class="request"
            :class="{'request--offset': index % 2}"
            v-for="(request, index) in this.leaveRequests"
            :key="index"
          >
            <h3 class="request__date">
              {{ formatDate(request.submitted) }}
              <small class="request__submitted">submitted</small>
            </h3>
            <p class="request__days">{{ request.days }}</p>
            <p class="request__type">{{ request.type }}</p>
            <p class="request__status">{{ request.outcome }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "LeaveLog",
  props: {
    leaveRequests: Array
  },
  data() {
    return {
      title: "Log"
    };
  },
  methods: {
    formatDate(date) {
      if (date) {
        return dayjs(date).format("DD/MM/YYYY");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
