import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import Validation from '../../_util/validation';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { Router } from '@angular/router';
import { basicInfo } from 'src/app/AuthInterface/auth.interface';
import {SiginService} from '../../services/SiginService/sigin.service'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registrationForm: FormGroup;
  selectedRole: any[];
  userRole: any[];
  submitted = false;
  phoneNumber : ''
  phoneNum:''
  constructor(private formBuilder: FormBuilder, private authService:AuthService, private router: Router,private SiginService:SiginService) {

    this.phoneNumber = this.router.getCurrentNavigation()?.extras.state?.sendPhoneNum;

   }

  ngOnInit(): void {
    this.authService.getPhoneNumber$
    .subscribe(sharedData => this.phoneNum = sharedData);
    console.log('check var with variable new',this.phoneNumber)
    this.registrationForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        role: ['', Validators.required],
        location: ['', Validators.required],
        phone: ['', Validators.compose([Validators.required,Validators.pattern(
          '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'
            )])],
        // phone: [
        //   '',
        //   [
        //     Validators.required,
        //     Validators.minLength(6),
        //     Validators.maxLength(20)
        //   ]
        // ],
        email: ['', [Validators.required, Validators.email]],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        // acceptTerms: [false, Validators.requiredTrue]
      },
      {
         validators: [Validation.match('password', 'confirmPassword')]
      }
    );
    this.userRole = [
      {name: 'Admin', code: 'admin'},
      {name: 'Fitness Center', code: 'center'},
      {name: 'Fitness Model', code: 'model'},
      {name: 'Fitness Professional', code: 'pro'},

  ];
  }

//   getAllReports() {

//     this.authService.getSignUpData('').subscribe(response =>{
//      console.log('Here is sign up data',response)

//   });
// }

  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }
  alertMessage = ""
  showStatus=false
  onSubmit(): void {

    this.submitted = true;

    // this.service.post(requestBody)
    if (this.registrationForm.invalid) {
      return;
    }
    let data=this.registrationForm.value

    let requestBody={} as basicInfo
    requestBody.phone= data.phone
    requestBody.name=data.name
    requestBody.email= data.email
    requestBody.password=data.password
    requestBody.location=data.location
    requestBody.role=data.role.value


    this.SiginService.RegisterUser(requestBody)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['/login']);
        console.log('success message pass',data)
      },
      error => {
        this.showStatus = true
        console.log('error pass',error)
        // alert(error["error"].message)
        this.alertMessage = error["error"].message
        setTimeout(() => {
          this.showStatus = false
        }, 2500);
      }
    );
    console.log(JSON.stringify(this.registrationForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.registrationForm.reset();
  }


}
