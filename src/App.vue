<template>
  <div
    id="app"
    class="min-h-screen text-current antialiased flex items-start bg-grey-dark dark:bg-black"
  >
    <Sidebar :title="store.title" />
    <main class="bg-primary rounded-[40px_0_0_40px] p-10 w-full min-h-screen">
      <Header />
      <section class="container mx-auto px-4">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div class="md:col-span-9">
            <Hero />
            <LeaveLog
              :leaveRequests="store.leaveRequests"
              :error="store.error"
              @delete="handleDelete"
              @update="handleUpdate"
            />
          </div>
          <div class="md:col-span-3 md:pl-[30px]">
            <LeaveRequest @submittedValues="handleSubmitted" />
          </div>
        </div>
      </section>
      <section class="container mx-auto px-4 mt-[38px]">
        <Leave :companyLeave="store.companyLeave" />
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import Header from "./components/Header.vue";
import Hero from "./components/Hero.vue";
import Leave from "./components/Leave.vue";
import LeaveLog from "./components/LeaveLog.vue";
import LeaveRequest from "./components/LeaveRequest.vue";
import Sidebar from "./components/Sidebar.vue";
import { useLeaveStore } from "./stores/leave";

const store = useLeaveStore();

onMounted(async () => {
  await store.checkStoredKey();
  if (typeof localStorage !== "undefined" && store.localStorageKey) {
    await store.hydrateFromStorage();
  }
});

type UpdatePayload = { id: number; days: string; status: string };
type DeletePayload = { id: number };
type SubmittedPayload = {
  id: number;
  days: string | number;
  type: string;
  status: string;
};

function handleDelete(payload: DeletePayload): void {
  // store expects a LeaveRequestItem with string id, but delete only needs id
  store.deleteRequest({
    id: String(payload.id),
    type: "annual",
    days: 0,
    status: "pending",
  });
}

function handleUpdate(payload: UpdatePayload): void {
  // Adapt emitted payload to store signature
  const id = String(payload.id);
  const daysNum = payload.days === "" ? undefined : Number(payload.days);
  const status = payload.status as any;
  void store.updateRequest({ id, days: daysNum as number | undefined, status });
}

function handleSubmitted(payload: SubmittedPayload): void {
  // Normalise and forward to store
  const item = {
    id: String(payload.id),
    days: Number(payload.days),
    type: payload.type as any,
    status: payload.status as any,
  };
  void store.formSubmitted(item);
}
</script>
