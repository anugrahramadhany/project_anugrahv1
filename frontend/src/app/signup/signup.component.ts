import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http"
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  file: File;
  imagePath: String;
  submitError = false

  constructor(private http: Http, private route: Router) { }

  ngOnInit() {
  }

  fileChange($event) {
    this.file = $event.target.files[0];
    console.log(this.file);
  }


  Signup(f: NgForm) {

    // let obj = {
    //   userName : f.value.userName,
    //   firstName : f.value.firstName,
    //   lastName:f.value.lastName,  
    //   writerImage:this.file,
    //   password : f.value.password
    // }
    if (f.value.userName != null && f.value.userName != "" && f.value.password != null && f.value.password != "" && f.value.email != null && f.value.email != "" && f.value.firstName != "" && f.value.firstName != null && this.file != null) {

      let formData = new FormData();
      formData.append("userName", f.value.userName);
      formData.append("firstName", f.value.firstName)
      formData.append("LastName", f.value.lastName)
      formData.append("writerImage", this.file)
      formData.append("password", f.value.password)




      // let header = new Headers({ "Content-Type": "application/json" });
      let header= new Headers();
      let options = new RequestOptions({ headers: header });

      this.http.post("http://localhost:3000/api/writer/signup", formData, options)
        .subscribe(
        result => {
          this.imagePath = result.json().path;
          this.route.navigate(['/login']);
        },
        error => {
          console.log("Error !");
        }
        );

    } else {
      console.log("Please Input All Fields")
      this.submitError = true
     
    }
  }

}


  