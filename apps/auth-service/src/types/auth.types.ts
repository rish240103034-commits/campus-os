export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
