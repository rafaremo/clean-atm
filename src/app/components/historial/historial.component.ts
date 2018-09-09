import { Component, OnInit } from '@angular/core';
import { fire } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  tickets = [];
  id: string;
  constructor(private route: ActivatedRoute, private rou: Router) {
    this.route.params.subscribe( params => {
      this.id = params.userId;
      fire.auth().onAuthStateChanged(user=>{
        if(user){
          let newPhone = user.phoneNumber.slice(1);
          console.log(newPhone);
          fire.firestore().collection("tickets").where("user", "==", newPhone).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let object = {
                  ...doc.data(),
                  key:doc.id
                };
                this.tickets.push(object);
            });
          })
          .catch(err => {
            console.log(err);
          });
        }
      });
    });
  }


  ngOnInit() {
    let user = localStorage.getItem('bbvaUser');

    if(!user){
      this.rou.navigate(['/']);
    }
  }

  logOut(){
    localStorage.removeItem('bbvaUser');
    fire.auth().signOut().then(() => {
      this.rou.navigate(['/']);
    }).catch(function(error) {
      console.log(error);
    });
  }
}
