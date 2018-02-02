import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './createpost/createpost.component';
import { SignupComponent } from './signup/signup.component';
import { ArticlelistComponent } from './articlelist/articlelist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticledetailComponent } from './articledetail/articledetail.component';
import { LoginComponent } from './login/login.component';
import { EditarticleComponent } from './editarticle/editarticle.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreatePostComponent,
    SignupComponent,
    ArticlelistComponent,
    DashboardComponent,
    ArticledetailComponent,
    LoginComponent,
    EditarticleComponent,
  ],
  imports: [
    BrowserModule,FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:"",component:HomeComponent},
      {path:"createpost",component:CreatePostComponent},
      {path:"signup",component:SignupComponent},
      {path:"articlelist",component:ArticlelistComponent},
      {path:"dashboard",component:DashboardComponent},
      {path:"login",component:LoginComponent},
      {path:"editarticle/:id",component:EditarticleComponent},
      {path:"articledetail/:id",component:ArticledetailComponent}
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
