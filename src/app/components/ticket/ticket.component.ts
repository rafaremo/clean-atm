import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import * as jsPdf from 'jspdf';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})

export class TicketComponent implements OnInit {
  item = {};
  id: String;
  constructor(private route: ActivatedRoute) {

    this.route.params.subscribe( params => {
      this.id = params.id;
      firebase.firestore().collection('tickets').doc(this.id).get().then(doc => {
        if (doc.exists) {
          this.item = doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    });
  }
  
  ngOnInit() {}

}
