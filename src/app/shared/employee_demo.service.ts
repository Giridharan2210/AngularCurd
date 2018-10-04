import { Injectable } from "@angular/core";

import { Employee } from './employee.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class EmployeeService {

    selectedEmployee : Employee;
    employeeList : Employee[];

    constructor(private http : Http) { }

    getEmployeeFromAPI(){
        let url = 'http://localhost:64027/api/Employees';
        this.http.get(url).map((data : Response)=>{return data.json() as Employee[];}).toPromise().then(x => {this.employeeList = x;})
    }

    postEmployeeToAPI(emp: Employee){
        var body = JSON.stringify(emp);
        let url = 'http://localhost:64027/api/Employees';
        var headerOptions = new Headers({'Content-Type':'application/json'});
        var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
        this.http.post(url,body,requestOptions).map(x => x.json());
    }

}