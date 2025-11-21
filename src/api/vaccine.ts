import { api, type PaginatedResult } from "./client";

export interface CreateVaccineRequest {
  name: string;
}

export interface VaccineResponse {
  id: string;
  name: string;
}

export async function getVaccinesApi(
  pageNumber = 1,
  pageSize = 10
): Promise<PaginatedResult<VaccineResponse>> {
  const res = await api.get(`/vaccine`, {
    params: { pageNumber, pageSize },
  });
  return res.data;
}

export async function createVaccineApi(
  data: CreateVaccineRequest
): Promise<VaccineResponse> {
  const res = await api.post(`/vaccine`, data);
  return res.data;
}
