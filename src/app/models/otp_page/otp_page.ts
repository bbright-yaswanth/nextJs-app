export class OtpPage {
  userName: string;
  mobileNumber: string;

  constructor(params: { userName: string; mobileNumber: string }) {
    this.userName = params.userName;
    this.mobileNumber = params.mobileNumber;
  }
}
