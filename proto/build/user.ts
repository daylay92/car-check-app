/* eslint-disable */


export interface UserId {
  id: string;
}

export interface UserEmail {
  email: string;
}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  hash: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
  hash: string;
  email: string;
}

export interface NewUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface IsValid {
  isExist: boolean;
}

export interface UserService {

  Create(request: UserData): Promise<NewUser>;

  FindUser(request: UserId): Promise<UserResponse>;

  FindUserByEmail(request: UserEmail): Promise<UserResponse>;

  DoesUserExistByEmail(request: UserEmail): Promise<IsValid>;

}
