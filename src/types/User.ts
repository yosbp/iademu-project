export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}
