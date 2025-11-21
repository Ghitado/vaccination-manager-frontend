import { api, type PaginatedResult } from "./client";
import type { VaccinationRecordResponse } from "./vaccinationRecord";

export interface CreatePersonRequest {
  name: string;
}

export interface PaginatedPersonResponse {
  id: string;
  name: string;
}

export interface PersonResponse {
  id: string;
  name: string;
  vaccinationRecords: VaccinationRecordResponse[];
}

export async function getPaginatedPersonsApi(
  pageNumber = 1,
  pageSize = 10
): Promise<PaginatedResult<PaginatedPersonResponse>> {
  const res = await api.get(`/person`, {
    params: { pageNumber, pageSize },
  });
  return res.data;
}

export async function createPersonApi(
  data: CreatePersonRequest
): Promise<PersonResponse> {
  const res = await api.post(`/person`, data);
  return res.data;
}

export async function getPersonByIdApi(id: string): Promise<PersonResponse> {
  const res = await api.get(`/person/${id}/vaccinationrecords`);
  return res.data;
}

export async function deletePersonByIdApi(id: string): Promise<void> {
  const res = await api.delete(`/person/${id}`);
  return res.data;
}
