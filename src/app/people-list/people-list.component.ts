import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  private results = [];
  
  private resultsObs = [];

  private termObs = new FormControl();

  constructor(private http: Http) { }

  ngOnInit() {
    this.termObs.valueChanges.subscribe(searchTerm => {
        this.peopleObservableAPI(searchTerm);
    });
  }

  private peopleObservableAPI(searchTerm) {
    this.peoplaAPI(searchTerm).subscribe((data: any) => {
      this.resultsObs = data.json().results;
    });
  }

  private peoplePromiseAPI(term) {
    this.peoplaAPI(term).toPromise().then((data: any) => {
      this.results = data.json().results;
    });
  } 

  private peoplaAPI(searchTerm) {
    return this.http.get(`https://swapi.co/api/people/?search=${searchTerm}`);
  }
}
