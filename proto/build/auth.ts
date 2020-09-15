/* eslint-disable */


export interface LoginDetails {
  email: string;
  password: string;
}

export interface TokenData {
  token: string;
}

export interface DecodedResponse {
  id: string;
  email: string;
  isAdmin: boolean;
}

export interface LoginResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  token: string;
  createdAt: string;
}

export interface SignupDetails {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthService {

  Login(request: LoginDetails): Promise<LoginResponse>;

  Signup(request: SignupDetails): Promise<LoginResponse>;

  Authenticate(request: TokenData): Promise<DecodedResponse>;

}
