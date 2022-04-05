export class DataBaseError extends Error {
  static statusCcode: number = 500;
  static message: string = 'Database errored';
  detail: string;

  constructor(detail: string) {
    super();
    this.detail = detail;
  }
}
export class NotAuthorised extends Error {
  static statusCcode: number = 403;
  static message: string = 'Not Authorised';
  detail: string;

  constructor(detail: string) {
    super();
    this.detail = detail;
  }
}
