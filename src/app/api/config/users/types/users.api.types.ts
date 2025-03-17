export interface NewUserInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}
export interface CreateUserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  role: string;
}
export interface UpdateUserInterface {
  email: string;
  firstName: string;
  lastName: string;
  loginTries: number;
  isEnabled: boolean;
}
export interface UpdateUserResponse {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isEnabled: boolean;
  loginTries: number;
  picture: string;
  role: string;
}
