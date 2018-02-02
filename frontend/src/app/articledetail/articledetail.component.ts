import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute,Router } from "@angular/router";


@Component({
  selector: 'app-articledetail',
  templateUrl: './articledetail.component.html',
  styleUrls: ['./articledetail.component.css']
})
export class ArticledetailComponent implements OnInit {

  article={};
  constructor(private router:Router,private route:ActivatedRoute,private http:HttpClient) { }
  
  ngOnInit() {
    this.getArticleDetail(this.route.snapshot.params['id'])
  }

  
  getArticleDetail(id) {
    this.http.get('http://localhost:3000/api/article/detail/'+id).subscribe(data => {
      this.article = data;
      console.log(this.article);
    });
  }

}
