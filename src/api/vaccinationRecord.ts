import { api } from "./client";

export interface CreateVaccinationRecordRequest {
  personId: string;
  vaccineId: string;
  appliedAt: string;
  dose: number;
}

export interface VaccinationRecordResponse {
  id: string;
  vaccineId: string;
  vaccineName: string;
  appliedAt: string;
  dose: number;
}

export async function createVaccinationRecordApi(
  data: CreateVaccinationRecordRequest
): Promise<VaccinationRecordResponse> {
  const res = await api.post(`/vaccinationrecord`, data);
  return res.data;
}

export async function deleteVaccinationRecordApi(id: string): Promise<void> {
  await api.delete(`/vaccinationrecord/${id}`);
}
