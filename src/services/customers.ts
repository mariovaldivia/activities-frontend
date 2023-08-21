import { api } from "src/boot/axios";
import { Customer, Activity } from "src/components/models";
import authHeader from '../services/auth-header'

export function getCustomers() {
    return api.get('customers/', { headers: authHeader() })
}

export function addCustomer(data: Customer) {
    return api.post('customers/', data)
}

export function updateCustomer(id: number, data: Customer) {
    return api.put(`customers/${id}/`, data, { headers: authHeader() })
}

