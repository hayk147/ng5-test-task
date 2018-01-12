import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ConsumerService {

  constructor(private httpClient: HttpClient){
  }

  getAllMessages(){
    return this.httpClient.get('http://127.0.0.1:8000/messages');
  }

}
