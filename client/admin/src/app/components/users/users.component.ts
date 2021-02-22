import { Component, Input, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../services/refresh.service';
import { addUser } from 'src/app/models/addUser';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: Users[] = [];
  user: Users;
  searchU = "";
  searchF = "";
  searchL = "";
  searchE = "";
  tmp = "";



  constructor(private usersService: UsersService,
    private rout: Router,
    private ref: RefreshService) { }

  ngOnInit(): void {
    this.load();

  }

  load() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }



  onDelete(_id: number) {
    this.usersService.deleteUser(_id).subscribe(() => {
      this.users = null;
      this.load();
    });

  }

  editUs(id: number) {
    this.rout.navigate(['/users', id]);

  }

  searchUser() {
    this.tmp = this.searchU + "=" + this.searchF + "=" + this.searchL + "=" + this.searchE;

    this.usersService.getUserByParam(this.tmp).subscribe(data => {
      this.users = data;
    });
  }


}
