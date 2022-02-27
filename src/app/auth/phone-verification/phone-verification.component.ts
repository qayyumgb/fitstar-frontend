import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { verfyPhoneDTO } from 'src/app/AuthInterface/auth.interface';
@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.scss']
})
export class PhoneVerificationComponent implements OnInit {
  verifyPhone: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router,private authService: AuthService) { }

  ngOnInit(): void {

    this.verifyPhone = this.formBuilder.group(
      {
        phone: ['', Validators.compose([Validators.required,Validators.pattern(
          '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'
            )])],

            role: ['seller', Validators.required],
      },

    );


  }
  get f(): { [key: string]: AbstractControl } {
    return this.verifyPhone.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.verifyPhone.invalid) {
      return;

    }
    else{
      this.getCodeone();
      this.getPhoneNum();
    }
    console.log(JSON.stringify(this.verifyPhone.value, null, 2));
  }
  users:any
  getCodeone(){
    this.authService.verifyPhone(this.verifyPhone.value as verfyPhoneDTO).subscribe(res => {
      this.users = res;
      this.router.navigate(['Auth/verifyOTP']);
    });
    // let res = await this.authService.sendCode(this.verifyPhone.value.phone);
    // console.log("finaly", res)

  }
  getPhoneNum(){
    this.authService.setPhoneNumber(
      this.verifyPhone.value.phone
    );
    // let res = await this.authService.sendCode(this.verifyPhone.value.phone);
    // console.log("finaly", res)

  }
}
