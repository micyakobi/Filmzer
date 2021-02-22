import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { Users } from 'src/app/models/users';
import { addUser } from 'src/app/models/addUser';



@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})

export class EdituserComponent implements OnInit {
  userUp:addUser;
  user:Users;

  constructor(private rout: ActivatedRoute,
    private userService: UsersService) { }

  ngOnInit(): void {

    let id = this.rout.snapshot.params['id'];

    this.userService.getUserById(id).subscribe(data=>{
        this.user=data;
    });

  }

  updateUser(usernameU: string, passwordU: number, adminU: string, firstNameU: string,
    lastNameU: string, emailU: string){

      let id = this.rout.snapshot.params['id'];

      const userNew :addUser=({
        username: usernameU,
        password:passwordU,
        admin:adminU,
        firstName:firstNameU,
        lastName:lastNameU,
        email:emailU

      });

      this.userService.updateUser(id,userNew).subscribe();
      console.log(userNew);

  }

  alert(){
    alert("Success");
  }


}

