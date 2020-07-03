export interface Client {
  id: number;
  name: string;
  nit_number: string;
  phone_number: string;
  city: string;
  address: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface Locales {
  id: number;
  client?: string | null;
  name: string;
  location: string;
  price: number;
  vat: number;
  observation: string;
}

export interface Token {
  token: string;
}

export interface ClientsPages {
  results: Client[];
  next: string;
  count: number;
  previous: string;
}

export interface LocalesPages {
  count: number;
  next: string;
  previous: string;
  results: Locales[]
}

export interface Navegacion {
  name: string;
  url: string;
}
