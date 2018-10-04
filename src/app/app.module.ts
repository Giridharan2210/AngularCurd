import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AuthGuardService } from './shared/auth-guard-service';
import { PeopleListComponent } from './people-list/people-list.component';

const routes: Routes = [
  { path: '', component: EmployeesComponent},
  { path: 'home', component: EmployeesComponent},
  { path: 'about-us', component: AboutUsComponent , canActivate: [ AuthGuardService ]},
  { path: 'people', component: PeopleListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    AboutUsComponent,
    PeopleListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
