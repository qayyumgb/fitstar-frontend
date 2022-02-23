import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Table } from 'primeng/table';
import {LandinpPageService} from '../../../services/LandingPageService/landinp-page.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  landingPagedetails: FormGroup;
  socialLinksDetails: FormGroup;
  todDetails: FormGroup;
  privacyDetails: FormGroup;
  submitted1 = false
  submitted2 = false
  submitted3 = false
  submitted4= false
  loginpagedata:any;

  constructor(private cd: ChangeDetectorRef,private formBuilder:FormBuilder,private LandinpPageService:LandinpPageService) { }

  ngOnInit(): void {
    this.landingPagedetails = this.formBuilder.group(
      {
        bannerTitle: ['', Validators.required],
        aboutusHeading: ['', Validators.required],
        aboutUsSubHeading: ['', Validators.required],
        aboutus_description:['',Validators.required],
        footer_description: ['', Validators.required],
        footerPhoneNum: ['', Validators.required],
        file: [null],
        image: [null],
        Silder2Image:[null],
        Silder3Image:[null],
        aboutImage:[null]
      }
    );

    this.socialLinksDetails = this.formBuilder.group(
      {
        instagramUrl: ['', Validators.required],
        facebookUrl: ['', Validators.required],
        youtubeUrl: ['', Validators.required],
        twitterUrl: ['', Validators.required],
        linkedInUrl: ['', Validators.required],
      }
    );

    this.todDetails = this.formBuilder.group(
      {
        todDescription: ['', Validators.required],

      }
    );

    this.privacyDetails = this.formBuilder.group(
      {
        privacyDetails: ['', Validators.required],

      }
    );

  }

  get f1(): { [key: string]: AbstractControl } {
    return this.landingPagedetails.controls;
  }
  get f2(): { [key: string]: AbstractControl } {
    return this.socialLinksDetails.controls;
  }
  get f3(): { [key: string]: AbstractControl } {
    return this.todDetails.controls;
  }
  get f4(): { [key: string]: AbstractControl } {
    return this.privacyDetails.controls;
  }


  onSubmit(): void {
    this.submitted1 = true;
    if (this.landingPagedetails.invalid) {
      return;
    }
    else
    console.log(this.landingPagedetails.value)

  }
  onSubmit2(): void {
    this.submitted2 = true;
    if (this.socialLinksDetails.invalid) {
      return;
    }
    else
    console.log(this.socialLinksDetails.value)
  this.socialLinksDetails.reset()
  }
  onSubmit3(): void {
    this.submitted3 = true;
    if (this.todDetails.invalid) {
      return;
    }
    else
    console.log(this.todDetails.value)
  this.todDetails.reset()
  }
  onSubmit4(): void {
    this.submitted4 = true;
    if (this.privacyDetails.invalid) {
      return;
    }
    else
    console.log(this.privacyDetails.value)
  this.privacyDetails.reset()
  }
  clear(table: Table) {
    table.clear();
  }



  ContentlandingPage1() {
    const formdata =this.landingPagedetails.value
    console.log("sending data to service side")
    this.LandinpPageService.CreateNewUser(formdata)
      .subscribe(
        response => {
          console.log('data addedd')
          console.log(response);
          this.submitted1 = true;
          // this.modalService.hide();
          // this.createAmbassador.value.reset
        },
        error => {
          console.log(error);
        });
  }
  ContentlandingPage2() {
    const formdata =this.socialLinksDetails.value
    console.log("sending data to service side")
    this.LandinpPageService.CreateNewUser(formdata)
      .subscribe(
        response => {
          console.log('data addedd')
          console.log(response);
          this.submitted1 = true;
          // this.modalService.hide();
          // this.createAmbassador.value.reset

        },
        error => {
          console.log(error);
        });
  }
  ContentlandingPage3() {
    const formdata =this.todDetails.value
    console.log("sending data to service side")
    this.LandinpPageService.CreateNewUser(formdata)
      .subscribe(
        response => {
          console.log('data addedd')

          console.log(response);
          this.submitted1 = true;
          // this.modalService.hide();
          // this.createAmbassador.value.reset

        },
        error => {
          console.log(error);
        });
  }
  ContentlandingPage4() {
    const formdata =this.privacyDetails.value
    console.log("sending data to service side")
    this.LandinpPageService.CreateNewUser(formdata)
      .subscribe(
        response => {
          console.log('data addedd')

          console.log(response);
          this.submitted1 = true;
          // this.modalService.hide();
          // this.createAmbassador.value.reset

        },
        error => {
          console.log(error);
        });
  }




  /*########################## File Upload ########################*/
@ViewChild('SilderImage1') el: ElementRef;
imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
editFile: boolean = true;
removeUpload: boolean = false;

uploadFile(event:any) {
  let reader = new FileReader(); // HTML5 FileReader API
  let file = event.target.files[0];
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(file);

    // When file uploads set it to file formcontrol
    reader.onload = () => {
      this.imageUrl = reader.result;
      this.landingPagedetails.patchValue({
        image: reader.result
      });
      this.editFile = false;
      this.removeUpload = true;
    }
    // ChangeDetectorRef since file is loading outside the zone
    this.cd.markForCheck();
  }
}

// Function to remove uploaded file
removeUploadedFile() {
  let newFileList = Array.from(this.el.nativeElement.files);
  this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  this.editFile = true;
  this.removeUpload = false;
  this.landingPagedetails.patchValue({
    image: [null]
  });
}










@ViewChild('silderimage2') Silderimg2: ElementRef;
Silder2ImageUrl: any = 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
editSilder2Img: boolean = true;
removeSilder2Img: boolean = false;

uploadSilder2File(event: any) {
  let reader = new FileReader(); // HTML5 FileReader API
  let file = event.target.files[0];
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(file);

    // When file uploads set it to file formcontrol
    reader.onload = () => {
      this.Silder2ImageUrl = reader.result;
      this.landingPagedetails.patchValue({
        Silder2Image: reader.result
      });
      this.editSilder2Img = false;
      this.removeSilder2Img = true;
    }
    // ChangeDetectorRef since file is loading outside the zone
    this.cd.markForCheck();
  }
}

// Function to remove uploaded file
removeFeaturedUploadedFile() {
  let newFileList = Array.from(this.Silderimg2.nativeElement.files);
  this.Silder2ImageUrl = 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
  this.editSilder2Img = true;
  this.removeSilder2Img = false;
  this.landingPagedetails.patchValue({
    Silder2Image: [null]
  });
}



@ViewChild('silderimage3') Silderimg3: ElementRef;
Silder3ImageUrl: any = 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
editSilder3Img: boolean = true;
removeSilder3Img: boolean = false;

uploadSilder3File(event: any) {
  let reader = new FileReader(); // HTML5 FileReader API
  let file = event.target.files[0];
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(file);

    // When file uploads set it to file formcontrol
    reader.onload = () => {
      this.Silder3ImageUrl = reader.result;
      this.landingPagedetails.patchValue({
        Silder3Image: reader.result
      });
      this.editSilder3Img = false;
      this.removeSilder3Img = true;
    }
    // ChangeDetectorRef since file is loading outside the zone
    this.cd.markForCheck();
  }
}

// Function to remove uploaded file
removeSilder3UploadedFile() {
  let newFileList = Array.from(this.Silderimg3.nativeElement.files);
  this.Silder3ImageUrl = 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
  this.editSilder3Img = true;
  this.removeSilder3Img = false;
  this.landingPagedetails.patchValue({
    Silder3Image: [null]
  });
}


@ViewChild('aboutImage') aboutImage: ElementRef;
AboutImageUrl: any = 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
editaboutImage: boolean = true;
removeImage: boolean = false;

uploadaboutImage(event: any) {
  let reader = new FileReader(); // HTML5 FileReader API
  let file = event.target.files[0];
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(file);

    // When file uploads set it to file formcontrol
    reader.onload = () => {
      this.AboutImageUrl = reader.result;
      this.landingPagedetails.patchValue({
        aboutImage: reader.result
      });
      this.editaboutImage = false;
      this.removeImage = true;
    }
    // ChangeDetectorRef since file is loading outside the zone
    this.cd.markForCheck();
  }
}

// Function to remove uploaded file
removeaboutImageUploadedFile() {
  let newFileList = Array.from(this.Silderimg3.nativeElement.files);
  this.AboutImageUrl = 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
  this.editaboutImage = true;
  this.removeImage = false;
  this.landingPagedetails.patchValue({
    aboutImage: [null]
  });
}
}
