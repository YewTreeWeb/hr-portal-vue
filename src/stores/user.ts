import { defineStore } from "pinia";

export interface User {
  name: string;
  office: string;
  company: string;
  role: string;
  hired: string | Date;
}

export const useUserStore = defineStore("user", {
  state: (): User => ({
    name: "",
    office: "",
    company: "",
    role: "",
    hired: "",
  }),
});
