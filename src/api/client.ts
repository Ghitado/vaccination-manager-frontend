import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
