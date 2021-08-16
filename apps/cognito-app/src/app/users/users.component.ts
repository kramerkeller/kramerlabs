import { AuthService } from './../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'kramerlabs-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {


  constructor(private _http: HttpClient) {}

  write() {
    const url = 'http://localhost:4200/api/writedb';
    Auth.currentSession().then(session => {
      // TODO: Replace all this with an interceptor that does this
      const token = session.getIdToken().getJwtToken();
      const headers = {"token": token}
      this._http.post(url, {"id":"1","name":"ram"}, {headers}).subscribe((response) => console.log(response));
    });
  }
}
