<template>
  <div class="card m-t-38">
    <div class="container">
      <div class="columns is-multiline" v-if="!this.error">
        <div class="column is-12">
          <h2>{{ title }}</h2>
        </div>
        <div class="column is-12" v-if="this.leaveRequests.length > 0">
          <div
            v-bind:id="`request-${index}`"
            class="request section"
            :class="{
              'request--offset': index % 2,
              'request--editied': editied,
            }"
            v-for="(request, index) in this.leaveRequests"
            :key="index"
          >
            <h4 class="request__date">
              {{ formatDate(request.submitted) }}
              <small class="request__submitted">submitted</small>
            </h4>
            <p
              class="request__days"
              ref="days"
              @click="makeEditable"
              contenteditable="true"
            >
              {{ request.days }}
            </p>
            <p class="request__type">{{ request.type }}</p>
            <p
              class="request__status"
              ref="status"
              @click="makeEditable"
              contenteditable="true"
            >
              {{ request.status }}
            </p>
            <p class="request__actions">
              <button
                class="button is-text request__update"
                @click="update(index)"
                :disabled="!editied"
              >
                Update
              </button>
              <button
                class="button is-text request__delete"
                @click="deleteLog(index)"
              >
                Delete
              </button>
            </p>
          </div>
        </div>
        <div class="column" v-else>
          <p>There are currently no leave requests</p>
        </div>
      </div>
      <p v-else>{{ this.error }}</p>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "LeaveLog",
  props: {
    leaveRequests: Array,
    error: String,
  },
  data() {
    return {
      title: "Leave",
      days: "",
      status: "",
      editied: false,
    };
  },
  methods: {
    formatDate(date) {
      if (date) {
        return dayjs(date).format("DD/MM/YYYY");
      }
    },
    makeEditable(e) {
      // add exisiting values to data properties
      console.log({
        days: `origin value ${this.days}`,
        status: `origin value ${this.status}`,
      });

      console.log(e.target);

      if (e.target.classList.contains("request__days")) {
        this.days = e.target.textContent;
        console.log({ days: `saved value ${this.days}` });
      } else {
        this.status = e.target.textContent;
        console.log({ days: `saved value ${this.status}` });
      }

      // check if log has class of editied if not add class and change contenteditable to true
      if (!this.editied) {
        this.editied = !this.editied;
        e.target.focus();
      }
    },
    update(id) {
      // if value has changed from stored data value, remove class editied
      // push updated data to parent component
      this.$emit("update", {
        id,
        days: this.$refs.days[0].textContent.trim(),
        status: this.$refs.status[0].textContent.trim(),
      });
      this.editied = false;
    },
    deleteLog(id) {
      this.$emit("delete", { id });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  min-height: 539px;
}
.request {
  @include flex(center, space-between, row);
  border-bottom: 1px solid v(colour-grey-dark);
  &:last-of-type {
    border-bottom: none;
  }
  &__submitted {
    display: block;
    color: v(colour-grey-light);
  }
  &__days,
  &__status {
    @include padding(null 15px);
    &:hover {
      cursor: pointer;
    }
  }
  &__actions {
    button {
      &:first-of-type {
        border-left: v(colour-grey-dark);
      }
    }
  }
}
.button.is-text {
  text-decoration: none !important;
}
</style>
