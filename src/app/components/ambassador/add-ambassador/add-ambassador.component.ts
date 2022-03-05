import { EventEmitter, Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DefaultImageURl } from 'src/app/shared/constants/default-image.bs64';
import { IAmbassador } from 'src/app/shared/interface/ambassador.interface';
import { AbbassadorService } from '../../../services/AbbassadorService/abbassador.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-ambassador',
  templateUrl: './add-ambassador.component.html',
  styleUrls: ['./add-ambassador.component.scss']
})
export class AddAmbassadorComponent implements OnInit {
  @Output() modalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() editAmbassadorData: IAmbassador;
  submitted: boolean = false;
  isLoading: boolean = false

  AmbassadorForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('', Validators.required),
    tagLine: new FormControl('', Validators.required),
    instagram: new FormControl('', Validators.required),
    facebook: new FormControl('', Validators.required),
    youtube: new FormControl('', Validators.required),
    tiwtter: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    picture: new FormControl(DefaultImageURl, Validators.required),
  })

  get f(): { [key: string]: AbstractControl } {
    return this.AmbassadorForm.controls;
  }
  constructor(private toastService: ToastrService, private ambbassadorService: AbbassadorService) { }



  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    debugger
    if (changes) {
      if (this.editAmbassadorData) {
        this.AmbassadorForm.patchValue(this.editAmbassadorData);
        this.AmbassadorForm.get('tiwtter')?.setValue(this.editAmbassadorData.tiwtter);
      }

    }
  }


  ngOnInit(): void {
  }


  toggleLoading() {
    this.isLoading = true;
  }


  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.AmbassadorForm.patchValue({
          picture: reader.result

        });
        console.log(reader.result);
      }

    }
  }



  onSubmit(): void {

    this.submitted = true;
    if (this.AmbassadorForm.invalid) {
      return;
    }
    else {
      const formData = this.AmbassadorForm.value;
      if (this.editAmbassadorData === undefined) {
        delete formData._id
        this.toggleLoading()
        this.ambbassadorService.CreateNewUser(formData).subscribe(
          response => {
            this.toastService.success(response.message);
            console.log(response);
            this.modalChange.emit(this.submitted);
            this.submitted = true;
            this.isLoading = false
          },
          error => {
            console.log(error);
          });

      }
      else {
        this.toggleLoading()
        this.ambbassadorService.updateAmbassador(formData).subscribe(
          response => {
            this.toastService.success(response.message);
            console.log(response);
            this.modalChange.emit(this.submitted);
            this.submitted = true;
            this.isLoading = false;
          },
          error => {
            console.log(error);
          });
      }

    }
  }

}
