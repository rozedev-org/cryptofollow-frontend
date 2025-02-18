export interface LoginEntity {
  user: UserByLogin;
  expiresIn: string;
}

export interface UserByLogin {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isEnabled: boolean;
  loginTries: number;
  role: string;
  picture: string;
}
