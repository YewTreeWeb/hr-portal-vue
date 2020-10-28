<template>
  <section class="section">
    <div class="container">
      <div class="columns is-multiline" v-if="!this.error">
        <div class="column is-12">
          <h2>{{ title }}</h2>
        </div>
        <div class="column is-12" v-if="this.leaveRequests.length > 0">
          <div
            v-bind:id="`request-${index}`"
            class="request section"
            :class="{ 'request--offset': index % 2 }"
            v-for="(request, index) in this.leaveRequests"
            :key="index"
          >
            <h4 class="request__date">
              {{ formatDate(request.submitted) }}
              <small class="request__submitted">submitted</small>
            </h4>
            <p class="request__days" ref="days" contenteditable="false">
              {{ request.days }}
            </p>
            <p class="request__type">{{ request.type }}</p>
            <p class="request__status" ref="status" contenteditable="false">
              {{ request.outcome }}
            </p>
            <p><span @click="update">Update</span> | <span>Delete</span></p>
          </div>
        </div>
        <div class="column" v-else>
          <p>There are currently no leave requests</p>
        </div>
      </div>
      <p v-else>{{ this.error }}</p>
    </div>
  </section>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "LeaveLog",
  props: {
    leaveRequests: Array,
    error: String
  },
  data() {
    return {
      title: "Leave Request Log"
    };
  },
  methods: {
    formatDate(date) {
      if (date) {
        return dayjs(date).format("DD/MM/YYYY");
      }
    },
    update(e) {
      e.target.closest().setAttribule("contenteditable", true);
      this.$refs.days.setAttribule("contenteditable", true);
    }
  }
};
</script>

<style lang="scss">
.request {
  @include flex(center, space-between, row);
  border-bottom: 1px solid v(colour-grey-dark);
  &:last-of-type {
    border-bottom: none;
  }
  &__submitted {
    display: block;
  }
}
</style>
