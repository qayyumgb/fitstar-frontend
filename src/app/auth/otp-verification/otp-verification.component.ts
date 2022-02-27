import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl,
  FormBuilder,
  FormGroup,
  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Config } from 'ng-otp-input/lib/models/config';
import { AuthService } from 'src/app/services/AuthService/auth.service';
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {
  @ViewChild('ngOtpInput') ngOtpInputRef:any;
  OTPForm: FormGroup;
  submitted = false;
  otp: number;
  verificationCode:number
  config :Config = {
    allowNumbersOnly: true,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router) { }
otpVerifcation:any[]
  ngOnInit(): void {
    this.OTPForm = this.formBuilder.group(
      {

        phone: [this.phoneNum, Validators.compose([Validators.required,Validators.pattern(
          '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'
            )])],
        OTP: [this.verificationCode, Validators.required],
      }
    );
  }
  onOtpChange(otp:any) {
    this.otp = otp;
  }
  test: FormGroup;
  phoneNum=""
  onSubmit(){
    this.verificationCode = this.otp
    this.authService.getPhoneNumber$
    .subscribe(sharedData => this.phoneNum = sharedData);
    this.test = this.formBuilder.group({
      phone:[this.phoneNum],
      otp:[this.verificationCode*1]
    })
    this.router.navigate(['Auth/signup'],{ state: { sendPhoneNum:this.phoneNum } });
    this.getCodeone()

  }
  getCodeone(){
    this.authService.verifyOTP(this.test.value).subscribe(res => {
      this.router.navigate(['Auth/signup'],{ state: { sendPhoneNum:this.phoneNum } });
    });
}

}
