import { Component, OnInit, Input } from '@angular/core';
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
          EmpCode : new FormControl(),
          Office : new FormControl(),
          Position : new FormControl()
        });
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

  isFieldValid(field: string) {
    return !this.employeeForm.get(field).valid && this.employeeForm.get(field).dirty;
  }

  onSubmit() {
    if(this.employeeForm.valid){
      if (this.employeeForm.value.EmployeeID == null) {
        this.employeeForm.value.EmployeeID = 0;
        this.employeeService.postEmployee(this.employeeForm.value)
          .subscribe(data => {
            // callback functions on post data 
            this.resetForm();
            this.employeeService.getEmployeeList();
            this.toastr.success('New Record Added Succcessfully', 'Employee Register');
          })
      }
      else {
        this.employeeService.putEmployee(this.employeeForm.value.EmployeeID, this.employeeForm.value)
        .subscribe(data => {
          this.resetForm();
          this.employeeService.getEmployeeList();
          this.toastr.info('Record Updated Successfully!', 'Employee Register');
        });
      }
    }else{
        this.validateAllFormFields(this.employeeForm); 
    }
  }
  validateAllFormFields(formGroup: FormGroup) {        
      Object.keys(formGroup.controls).forEach(field => {  
        const control = formGroup.get(field);             
        if (control instanceof FormControl) {            
          control.markAsDirty({ onlySelf: true });
        } else if (control instanceof FormGroup) {        
          this.validateAllFormFields(control);            
        }
      });
  }
}