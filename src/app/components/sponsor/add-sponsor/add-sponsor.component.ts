import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SponserService } from 'src/app/services/SponserService/sponser.service';
import { DefaultImageURl } from 'src/app/shared/constants/default-image.bs64';
import { ISponsors } from 'src/app/shared/interface/sponsor.interface';

@Component({
  selector: 'app-add-sponsor',
  templateUrl: './add-sponsor.component.html',
  styleUrls: ['./add-sponsor.component.scss']
})
export class AddSponsorComponent implements OnInit {
  @Output() modalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() editBlogData: ISponsors;
  submitted: boolean = false;
  isLoading:boolean=false


  SponsorsForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    image:new FormControl(DefaultImageURl, Validators.required),

  })

  get f(): { [key: string]: AbstractControl } {
    return this.SponsorsForm.controls;
  }



  constructor(private toastService: ToastrService,private sponsorsService:SponserService) { }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes) {
      if (this.editBlogData) {
        this.SponsorsForm.patchValue(this.editBlogData);
        // this.AmbassadorForm.get('tiwtter')?.setValue(this.editAmbassadorData.tiwtter);
      }

    }
  }



  ngOnInit(): void {
  }

  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.SponsorsForm.patchValue({
          image: reader.result

        });
        console.log(reader.result);
      }
    }
  }

  toggleLoading(){
    this.isLoading=true;
  }

  onSubmit(): void {

    this.submitted = true;
    if (this.SponsorsForm.invalid) {
      return;
    }
    else {
      const formData = this.SponsorsForm.value;
      this.toggleLoading()
      if (this.editBlogData === undefined) {
        delete formData._id
        this.sponsorsService.CreateNewUser(formData).subscribe(
          response => {
            this.toastService.success(response.message);
            console.log(response);
            this.modalChange.emit(this.submitted);
            this.submitted = true;
            this.isLoading=false
          },
          error => {
            console.log(error);
          });

      }
      else {

        this.sponsorsService.updateSponsors(formData).subscribe(
          response => {
            this.toastService.success(response.message);
            console.log(response);
            this.modalChange.emit(this.submitted);
            this.submitted = true;
          },
          error => {
            console.log(error);
          });
      }

    }
  }


}
