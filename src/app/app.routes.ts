import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileList2Component } from './profile-list2/profile-list2.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ResultEntryComponent } from './result-entry/result-entry.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddNewComponent } from './add-new/add-new.component';

export const routes: Routes = [
    {path: '',component: AuthComponent},
    {path: 'profile',component: ProfileListComponent},
    {path: 'profile2',component: ProfileList2Component},
    {path: 'edit',component: ProfileEditComponent},
    {path: 'result',component: ResultEntryComponent},
    {path: 'reg',component: RegistrationComponent},
    {path: 'add',component: AddEmployeeComponent},
    {path: 'addnew',component: AddNewComponent},


];
