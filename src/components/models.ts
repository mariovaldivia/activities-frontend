export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Customer {
  name: string
  identification: string
  address: string
}

export interface Contract {
  id: number,
  description: string,
  identification: string,
  customer: number,
  contract: number,
  detail: string,
  start: Date,
  finish: Date
}

export interface ContractParam {
  customer_id: number | null,

}

export interface Vehicle {
  brand: string
  model: string
  plate: string
}

export interface Activity {
  description: string
  customer: number,
  start: Date,
  finish: Date,
  detail?: string
}

export interface WorkerActivity {
  worker: number,
  role: string

}

export interface VehicleActivity {
  vehicle: number,

}

export interface UserLogin {
  email: string
  password: string
}

export interface Token {
  access: string,
  refresh: string
}

export interface User {
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  image: string
}

export enum ActivityStatus {
  Rejected = 'RJ',
  Registered = 'R',
  Accepted = 'A',
  Executing = 'E',
  Done = 'D',

}
