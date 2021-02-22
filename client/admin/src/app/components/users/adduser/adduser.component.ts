import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { addUser } from '../../../models/addUser';
import { UsersService } from '../../../services/users.service';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})


export class AdduserComponent implements OnInit {


  constructor(private usersservice: UsersService,
              private rout:Router) { }

  ngOnInit(): void {
  }

  createUser(usernameU: string, passwordU: number, adminU: string, firstNameU: string,
    lastNameU: string, emailU: string){

        const userNew :addUser=({

          username: usernameU,
          password:passwordU,
          admin:adminU,
          firstName:firstNameU,
          lastName:lastNameU,
          email:emailU

        });

        this.usersservice.createUser(userNew).subscribe();
        //console.log(userNew);
        this.rout.navigate(['/users']);

    }

}
