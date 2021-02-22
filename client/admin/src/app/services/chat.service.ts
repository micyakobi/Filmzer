import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import { isObject } from 'rxjs/internal/util/isObject';
import * as io from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket:Socket) { }
  // private socket = io('http://localhost:3000');

  joinRoom(data){
    this.socket.emit('join', data);
  }

  newUserJoin(){
    let obs= new Observable<{user:String, message:String}>(ob=>{
      this.socket.on('new user joind',(data)=> {
        ob.next(data);
      });
      return ()=>{this.socket.disconnect();}
    });
    return obs;
  }

  leaveRoom(data){
    this.socket.emit('leave',data);
  }

  userLeftRoom(){
    let obs= new Observable<{user:String, message:String}>(ob=>{
      this.socket.on('left room',(data)=> {
        ob.next(data);
      });
      return ()=>{this.socket.disconnect();}
    });
    return obs;
  }

  sendMessage(data){
    this.socket.emit('message', data);
  }
  newMessageRecived(){
    let obs= new Observable<{user:String, message:String}>(ob=>{
      this.socket.on('new message',(data)=> {
        ob.next(data);
      });
      return ()=>{this.socket.disconnect();}
    });
    return obs;
  }


}
