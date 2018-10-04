import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms'

import { EmployeeService } from '../../shared/employee.service'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  profileForm : FormGroup;
  employeeForm : FormGroup;

  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {

    this.resetForm();

    this.employeeForm = new FormGroup({
      EmployeeID : new FormControl(),
      FirstName : new FormControl('',Validators.required),
      LastName : new FormControl('',Validators.required),
      EmpCode : new FormControl('',Validators.required),
      Office : new FormControl('',Validators.required),
      Position : new FormControl('',Validators.required)
    });

    // this.profileForm = new FormGroup({
    //   profileCode : new FormControl(2),
    //   firstName : new FormControl('',Validators.required),
    //   lastName : new FormControl('',Validators.required)
    // })
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.employeeService.selectedEmployee = {
      EmployeeID: null,
      FirstName: '',
      LastName: '',
      EmpCode: '',
      Position: '',
      Office: ''
    }
  }

  onProfileSubmit(){
    console.log(this.profileForm.value);
  }

  onSubmit(form: NgForm) {
    if (form.value.EmployeeID == null) {
      form.value.EmployeeID = 0;
      this.employeeService.postEmployee(form.value)
        .subscribe(data => {
          // callback functions on post data 
          this.resetForm(form);
          this.employeeService.getEmployeeList();
          this.toastr.success('New Record Added Succcessfully', 'Employee Register');
        })
    }
    else {
      this.employeeService.putEmployee(form.value.EmployeeID, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.employeeService.getEmployeeList();
        this.toastr.info('Record Updated Successfully!', 'Employee Register');
      });
    }
  }
}