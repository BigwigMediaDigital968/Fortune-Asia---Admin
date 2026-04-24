import { api } from "./api";

export const fetchEmployees = async () => {
  const res = await api.get("/api/employees/active");
  return res?.data;
};