import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userNamesubmit=false


  constructor(private http: Http, private route: Router) { }



  ngOnInit() {
    sessionStorage.removeItem("userName")
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  Login(f: NgForm) {
    let obj = {
      userName: f.value.userName,
      password: f.value.password
    }

    let header = new Headers({ "Content-Type": "application/json" })
    let options = new RequestOptions({ headers: header });

    this.http.post("http://localhost:3000/api/writer/login", obj, options)
      .subscribe(
      result => {
        sessionStorage.setItem("userName", obj.userName);
        sessionStorage.setItem("token", result.json().token)
        
        this.route.navigate(['/dashboard'])
      }, error => {
        
        this.userNamesubmit = false
        console.log("user not found")
      }
      )

  }
}
