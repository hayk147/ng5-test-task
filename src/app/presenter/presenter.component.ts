import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { ConsumerService } from '../consumer.service';

@Component({
  selector: 'app-presenter',
  templateUrl: './presenter.component.html',
  styleUrls: ['./presenter.component.scss'],
  animations: [

    //  Animation for messages list
    trigger('messages', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),


        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ]))]), {optional: true})

      ])
    ])

  ]
})

export class PresenterComponent implements OnInit {

  messages = [];

  constructor(private consumerService: ConsumerService) { }

  ngOnInit() {
    // Get all messages from service
    this.consumerService.getAllMessages()
      .subscribe(
        // Successful responses call the first callback.
        (response: any ) => {
          this.messages = response;
          let messagesLength = this.messages.length;
          if(messagesLength > 0) {
            //call setTimeout with expired time(milliseconds) for each message
            for(let i =0; i < messagesLength; i++){
              let dateExpired = new Date(this.messages[i].expiration_date);
              let dateNow = new Date();
              let millisecondsNow  = dateNow.getTime();
              let millisecondsExpired  = dateExpired.getTime();
              let expiredTime = millisecondsExpired - millisecondsNow;
              if(this.messages && this.messages[i] && this.messages[i].id) {
                let id =this.messages[i].id;
                setTimeout (() => {
                  this.removeMessage(id);
                }, expiredTime)
              }
            }
          }
        },
        // Errors will call this callback instead:
        error => {
          console.log('Something went wrong!');
          return error;
        }
      );
  }

  //Remove message from messages array by id
  removeMessage(id:any) {
    let messagesLength = this.messages.length;
    if(messagesLength > 0) {
      for(let i =0; i < messagesLength; i++){
        if(this.messages && this.messages[i] && this.messages[i].id == id) {
          this.messages.splice(i, 1);
        }
      }
    }
  }

}
