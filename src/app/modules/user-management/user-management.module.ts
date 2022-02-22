import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementComponent } from './user-management.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { UserManagementRoutingModule } from './user-management-routing.module';

@NgModule({
    declarations: [
        UserManagementComponent
    ],
    imports: [
        CommonModule,
        UserManagementRoutingModule,
        NgbModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
    ]
})
export class UserManagementModule { }
