import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { NavigationExtras, Router, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'students-details-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginFormModel : any ={
    username : "",
    password : ""
  }

  constructor( 
    public authSirvice : AuthService,
    public router : Router
    ){ }

  login(forms : any){
    //debugger;
    console.log(forms)
    this.authSirvice.login().subscribe(
      ()=>{
        if(this.authSirvice.isLoggedIn){
          const redirectUrl = '/dashboard/landing';

          const navigationExtras : NavigationExtras ={

            queryParamsHandling :"preserve",
            preserveFragment :true
          };

          this.router.navigate([redirectUrl] ,navigationExtras);
        }
      }
    )
  }

  logout(){
    this.authSirvice.logOut();
  }

}
