import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addUser } from 'src/app/models/addUser';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: addUser;
  isTrue=true;

  constructor(private rout: Router,
              private loginservice: LoginService) { }

  ngOnInit(): void {
  }

  loginAdmin(email: string, password: number) {
    

    //console.log(email, password);

    this.loginservice.getUserByEmail(email).subscribe(data=>{
      this.user=data;
      
      if(password===this.user[0].password && this.user[0].admin===true){  
        
        localStorage.setItem('isLoggedin', 'true') ;
        this.rout.navigate(['/dashboard']);
      }

    });
    
    
    // this.rout.navigate(['/dashboard']);
  }
  



}
