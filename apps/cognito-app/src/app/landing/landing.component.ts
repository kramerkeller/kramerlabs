import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'kramerlabs-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

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