import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { AddBranchComponent } from './add-branch/add-branch.component';

export const adminRoutes: Routes = [
    {
        path: '', component:NavigationComponent,
        children: [
            { path: 'employees-list', component:EmployeesListComponent },
            { path: 'add-employee', component:AddEmployeeComponent },
            { path: 'branch-details', component:BranchDetailsComponent },
            { path: 'add-branch', component:AddBranchComponent },
            { path: '', redirectTo: 'employees-list', pathMatch: 'full' }
        ],
    }
]