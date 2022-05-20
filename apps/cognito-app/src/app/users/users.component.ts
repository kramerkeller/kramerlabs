import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'kramerlabs-users',
  template: `
<mat-form-field appearance="fill">
  <mat-label>Input</mat-label>
  <input matInput>
</mat-form-field>
<mat-form-field appearance="fill">
  <mat-label>Select</mat-label>
  <mat-select>
    <mat-option value="one">First option</mat-option>
    <mat-option value="two">Second option</mat-option>
  </mat-select>
</mat-form-field>
<mat-form-field appearance="fill">
  <mat-label>Textarea</mat-label>
  <textarea matInput></textarea>
</mat-form-field>
  `,
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
