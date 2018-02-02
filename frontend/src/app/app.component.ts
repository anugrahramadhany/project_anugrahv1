import { Component,AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loginuserName = "Login"
  logout="Logout"
  visible=false

  ngAfterViewChecked(){
    
    
  }


  logoutButton(){
    sessionStorage.removeItem("userName")
    sessionStorage.removeItem("token")
  

    localStorage.removeItem("userName")
    localStorage.removeItem("token")
    

    console.log(this.loginuserName)
    this.loginuserName = "Login"
    this.visible = false
  }
}



