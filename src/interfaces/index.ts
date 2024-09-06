export interface IUserSignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IResponseError {
  status: string;
  message: string;
}

export interface IEmailData {
  to: string;
  subject: string;
  template: string;
  variables: Record<string, any>;
}

export interface IResponseMessage {
  response_code: number;
  message: string;
}

export type UserUpdatePayload = any & {
  photo: string;
};

export interface IUserProfilePicturePayload {
  photo: string;
}
