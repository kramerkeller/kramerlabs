import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Auth } from 'aws-amplify';
import { from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'kramerlabs-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  user: any;

  constructor(private _http: HttpClient) {}

  read() {
    const url = 'http://localhost:4200/api/users/';
    this._http.get(url).subscribe((response) => this.user = response);
  }

  write() {
    const url = 'http://localhost:4200/api/writedb';
    this._http.post(url, {"id":"1","name":"ram"}).subscribe((response) => console.log(response));
  }
}
