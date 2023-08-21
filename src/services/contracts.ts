import { api } from "src/boot/axios";
import { Contract, ContractParam } from "src/components/models";
import authHeader from '../services/auth-header'

export function getContracts() {
    return api.get('contracts/', { headers: authHeader() })
}

export function getContractsByCustomer(customer_id: number) {
    return api.get(`contracts/?customer=${customer_id}`, { headers: authHeader() })
}

export function addContract(data: Contract) {
    return api.post('contracts/', data, { headers: authHeader() })
}

export function updateCustomer(id: number, data: Contract) {
    return api.put(`customers/${id}/`, data, { headers: authHeader() })
}

