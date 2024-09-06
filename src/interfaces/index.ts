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
  from: string;
  to: string;
  subject: string;
  html: string;
}
