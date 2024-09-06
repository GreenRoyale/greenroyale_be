export interface IEmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
  template: string;
  variables: Record<string, any>;
}
