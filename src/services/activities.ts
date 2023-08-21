import { api } from 'src/boot/axios';
import { Activity, WorkerActivity, VehicleActivity } from 'src/components/models';
import authHeader from '../services/auth-header'

export async function getActivities(params = {}) {
  return api.get('activities/', {
    params: params,
    headers: authHeader()
  })
}

export async function getComingActivities() {
  return api.get('activities/coming_activities', {
    headers: authHeader()
  })
}

export function getActivity(id: number) {
  return api.get(`activities/${id}/`, {
    headers: authHeader()
  })
}

export function addActivity(data: Activity) {
  return api.post('activities/', data, { headers: authHeader() })
}

export function addWorkerActivity(id: number, data: WorkerActivity) {
  return api.post(`activities/${id}/add_worker/`, data, {
    headers: authHeader()
  })
}

export function addVehicleActivity(id: number, data: VehicleActivity) {
  return api.post(`activities/${id}/add_vehicle/`, data, {
    headers: authHeader()
  })
}

export function setAcceptActivity(id: number) {
  return api.post(`activities/${id}/accept_activity/`, null, {
    headers: authHeader()
  })
}

export function setRejectActivity(id: number) {
  return api.post(`activities/${id}/reject_activity/`, null, {
    headers: authHeader()
  })
}

export function setExecutedActivity(id: number) {
  return api.post(`activities/${id}/execute_activity/`, null, {
    headers: authHeader()
  })
}

export function setDoneActivity(id: number) {
  return api.post(`activities/${id}/finish_activity/`, null, {
    headers: authHeader()
  })
}
