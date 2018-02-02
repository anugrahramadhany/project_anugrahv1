import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  file: File;
  articleList = []
  userName;
  writerList = []
  name;
  imageWriter;
  constructor(private http: Http, private route: Router) { }

  ngOnInit() {

    

    this.loadArticleList();
    
    // this.loadSessionWriter();
  }

  

  loadArticleList() {
    // let header = new Headers();
    // let options = new RequestOptions({ headers: header });
    this.http.get("http://localhost:3000/api/article/")
      .subscribe(
      result => {
        this.articleList = result.json();
      },
      error => {

      }
      );
  }

  DeleteArticle(id) {
    let header = new Headers();
    let options = new RequestOptions({ headers: header });

    this.http.delete("http://localhost:3000/api/article/" + id, options)
      .subscribe(
      result => {
        this.loadArticleList();
      },
      error => {
        console.log(error);
      }
      )
  }


  

}



