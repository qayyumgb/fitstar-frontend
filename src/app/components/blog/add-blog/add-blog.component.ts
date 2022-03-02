import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlogPostService } from 'src/app/services/BlogPostService/blog-post.service';
import { DefaultauthorURl, DefaultFeturedImageURl } from 'src/app/shared/constants/authorImage.bs64';
import { DefaultImageURl } from 'src/app/shared/constants/default-image.bs64';
import { IBlogpost } from 'src/app/shared/interface/BlogPost.interface';


@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  @Output() modalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() editBlogData: IBlogpost;
  submitted: boolean = false;



  selectedcatagory: any[]
  catagory: any[];


  BlogForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    title: new FormControl ('', Validators.required),
    description: new FormControl ('', Validators.required),
    authorName:new FormControl ('', Validators.required),
    category: new FormControl ('', Validators.required),

    videoLink: new FormControl ('', Validators.required),
    details: new FormControl ('', Validators.required),
    authorImage: new FormControl(DefaultauthorURl, Validators.required),
    featuredImageOne:  new FormControl(DefaultFeturedImageURl, Validators.required),
    featuredImageTwo:  new FormControl('', Validators.required),
  })


  get f(): { [key: string]: AbstractControl } {
    return this.BlogForm.controls;
  }

  constructor(  private toastService: ToastrService,private blogService:BlogPostService

    ) {

      this.catagory = [
        { label: "Nutrition", value: "Nutrition" },
        { label: "Recipies", value: "Recipies" },
        { label: "Workouts", value: "Workouts" },
        { label: "Reviews", value: "Reviews" },
        { label: "Podcasts", value: "Podcasts" },
        { label: "Music", value: "Music" },
        { label: "News", value: "News" }
      ];
    }
    ngOnChanges(changes: SimpleChanges): void {
      //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
      //Add '${implements OnChanges}' to the class.
      if (changes) {
        if (this.editBlogData) {
          this.BlogForm.patchValue(this.editBlogData);

        }

      }
    }
  ngOnInit(): void {
  }

  uploadauthorImage(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.BlogForm.patchValue({
          authorImage: reader.result,


        });
        console.log(reader.result);
      }

    }
  }


  uploadfeaturedImageOne(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.BlogForm.patchValue({

          featuredImageOne:reader.result,


        });
        console.log(reader.result);
      }

    }
  }


  uploadfeaturedImageTwo(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.BlogForm.patchValue({

          featuredImageTwo:reader.result,

        });
        console.log(reader.result);
      }

    }
  }




  onSubmit(): void {

    this.submitted = true;
    if (this.BlogForm.invalid) {
      return;
    }
    else {
      const formData = this.BlogForm.value;
      if (this.editBlogData === undefined) {
        delete formData._id
        this.blogService.CreateNewUser(formData).subscribe(
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
      else {
debugger
        this.blogService.updateBlogPost(formData).subscribe(
          response => {
            debugger
            this.toastService.success(response.message);
            console.log(response);
            debugger;
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
