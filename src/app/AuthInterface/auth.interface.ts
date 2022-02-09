export interface verfyPhoneDTO {
  phone: string;
  role: string;
}
export interface basicInfo {
  phone: string;
  name:string;
  email: string;
  password:string;
  role:{};
  location:string;
}
export interface login {
  email: string;
  password:string
}
export interface OTP {
  phone:string;
  otp:number
}
