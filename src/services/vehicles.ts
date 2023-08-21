import { api } from 'src/boot/axios';
import { Vehicle } from 'src/components/models';
import authHeader from '../services/auth-header'

export function getVehicles() {
  return api.get('vehicles/', { headers: authHeader() })
}

export function getLastVehicles() {
  return api.get('vehicles/last_vehicles', { headers: authHeader() })
}

export function addVehicle(data: Vehicle) {
  return api.post('vehicles/', data)
}

export function updateVehicle(id: number, data: Vehicle) {
  return api.put(`vehicles/${id}/`, data, { headers: authHeader() })
}

