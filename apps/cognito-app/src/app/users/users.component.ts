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

  constructor(private _http: HttpClient, _router: Router) {
    Auth.currentAuthenticatedUser().then(
      (user: any) => console.log(user),
      _err => _router.navigate(['/login'])
    );
  }

  read() {
    const url = 'http://localhost:4200/api/users/7be4e856-fb5b-4cba-aaf0-fd1bbd80da45';
    Auth.currentSession().then(session => {
      // TODO: Replace all this with an interceptor that does this
      const token = session.getIdToken().getJwtToken();
      const headers = {"token": token}
      this._http.get(url, {headers}).subscribe((response) => console.log(response));
    });
  }

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
