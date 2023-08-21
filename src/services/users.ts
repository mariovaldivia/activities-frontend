import { api } from 'src/boot/axios';
import { UserLogin, User } from 'src/components/models';
import authHeader from '../services/auth-header'

export function login(data: UserLogin) {
  return api.post('api/token/', data)
}

export function refreshToken(token: string) {
  return api.post('api/token/refresh/', {
    refresh: token
  })
}

export async function getUsers(params = {}) {
  return api.get('users/', {
    params: params,
    headers: authHeader()
  })
}

export async function getLastUsers(params = {}) {
  return api.get('users/last_users', {
    params: params,
    headers: authHeader()
  })
}

export function addUser(data: User) {
  return api.post('users/', data, { headers: authHeader() })
}

export function updateUser(id: number, data: User) {
  return api.put(`users/${id}/`, data, { headers: authHeader() })
}

export function imageUser(username: string, data: object) {
  return api.patch(`users/${username}/`, data, { headers: authHeader(true) })
}
