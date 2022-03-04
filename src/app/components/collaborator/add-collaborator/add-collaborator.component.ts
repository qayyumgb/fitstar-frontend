import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CollaboratorService } from 'src/app/services/collaboratorService/collaborator.service';
import { DefaultImageURl } from 'src/app/shared/constants/default-image.bs64';
import { ICollaborator } from 'src/app/shared/interface/collaborator.interface';

@Component({
  selector: 'app-add-collaborator',
  templateUrl: './add-collaborator.component.html',
  styleUrls: ['./add-collaborator.component.scss']
})
export class AddCollaboratorComponent implements OnInit {
  @Output() modalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() editCollaboratorData: ICollaborator;
  isLoading:boolean=false

  collaboratorForm: FormGroup = new FormGroup(
    {
      _id: new FormControl(''),
      title: new FormControl('', Validators.required),
      subTitle: new FormControl('', Validators.required),
      instagram: new FormControl('', Validators.required),
      facebook: new FormControl('', Validators.required),
      youtube: new FormControl('', Validators.required),
      tiwtter: new FormControl('', Validators.required),
      picture: new FormControl(DefaultImageURl, Validators.required),
    });

  submitted: boolean = false;

  constructor(private collaboratorService: CollaboratorService, private modalService: BsModalService, private toastService: ToastrService,) { }

  get f(): { [key: string]: AbstractControl } {
    return this.collaboratorForm.controls;
  }


  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes) {
      if (this.editCollaboratorData) {
        this.collaboratorForm.patchValue(this.editCollaboratorData);
        // this.collaboratorForm.get('tiwtter')?.setValue(this.editCollaboratorData.twitter);
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
        this.collaboratorForm.patchValue({
          picture: reader.result

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
    if (this.collaboratorForm.invalid) {
      return;
    }
    else {

      const formData = this.collaboratorForm.value;
      if (this.editCollaboratorData === undefined) {
        delete formData._id
        this.toggleLoading()
        this.collaboratorService.CreateNewUser(formData).subscribe(
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
        this.toggleLoading()
        this.collaboratorService.updateCollaborator(formData).subscribe(
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

    }
  }


}
