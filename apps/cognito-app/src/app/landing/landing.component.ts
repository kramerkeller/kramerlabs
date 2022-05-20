import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { of, Observable } from 'rxjs';

interface contract {
  id: number,
  name: string,
  amount: number
}

@Component({
  selector: 'kramerlabs-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  user: any;

  list$: Observable<contract[]> = of([
    {id: 1, name: "jed", amount: 10},
    {id: 2, name: "fred", amount: 11},
    {id: 3, name: "ned", amount: 12}
  ]);

  // transformAndLog() {
  //   this.list$.pipe((contract) =>
  //     console.log(contract)
  //     // contract.map((record) => record['amount2'] = (record.amount / 2))
  //   );
  // }

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
