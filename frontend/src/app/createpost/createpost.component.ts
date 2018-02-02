import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatePostComponent implements OnInit {
  file: File;
  imagePath: String;
  userName;
  writerList = []
  writerName
  ImageWriter;





  constructor(private http: Http, private route: Router) { }
  token: any
  ngOnInit() {
    
    this.loadSessionAdmin();


  }


  loadSessionAdmin() {
    this.userName = sessionStorage.getItem("userName");
    // console.log(this.username);
    this.http.get("http://localhost:3000/api/writer/")
      .subscribe(
      result => {
        this.writerList = result.json();
        for (let i = 0; i < this.writerList.length; i++) {
          if (this.writerList[i].userName == this.userName) {
            this.writerName=this.writerList[i].userName 
            this.ImageWriter = this.writerList[i].writerImage;
          }
        }
        // console.log(this.fotoAdmin);

      },
      error => {

      }
      );
  }

  
  fileChange($event) {
    this.file = $event.target.files[0];
    console.log(this.file);
  }


  Submit(f: NgForm) {
    if (f.value.title != null && f.value.title != "" && f.value.excerpt != null && f.value.excerpt != "" && f.value.story != null && f.value.story != "" && this.file != null) {

      let formData = new FormData()
      formData.append("title", f.value.title)
      formData.append("excerpt", f.value.excerpt)
      formData.append("story", f.value.story)
      formData.append("articleimages", f.value.articleimages)
      // formData.append("articleDate", f.value.articleDate)

      let header = new Headers({ "Authorization": "Bearer" + this.token })
      // let header = new Headers();
      let options = new RequestOptions({ headers: header });

      this.http.post("http://localhost:3000/api/article/", formData, options)
        .subscribe(
        result => {
          console.log(result.json());
          this.route.navigate(["/dashboard"]);
          f.reset();
        },
        error => {
          console.log(error);
          sessionStorage.removeItem("token");
          localStorage.removeItem("token")
          this.route.navigate(['/login'])
        }
        )
    } else {
      console.log("Please input all fields.")
    }

  }
}



