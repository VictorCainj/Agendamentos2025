export type UserType = 'prestador' | 'imobiliaria';

export interface User {
  id: string;
  email: string;
  password: string; // hash
  type: UserType;
  name: string;
} 