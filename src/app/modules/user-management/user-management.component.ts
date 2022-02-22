import { Component, TemplateRef } from '@angular/core';
import { userDTO } from 'src/app/models/userDTO';
import { UserService } from 'src/app/services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnumUserRole } from 'src/app/models/globalEnum';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  usersList: userDTO[] = [];
  userRole: userDTO[] = [];
  tempUserRole: userDTO[] = [];
  seniorUsers: userDTO[] = [];
  tempSeniorUsers: userDTO[] = [];
  wfmProfessionals: userDTO[] = [];
  tempWFMProfessionals: userDTO[] = [];
  addUserModalRef?: BsModalRef;
  enumUserRoles = EnumUserRole;

  constructor(
    private userService: UserService,
    private modalService: BsModalService
  ) { }



  ngOnInit(): void {
    // Calling Service for reading employees.json file
    this.userService.getUserData()
      .subscribe(response => {
        this.usersList = response.users;
        this.userRole = this.usersList.filter(user => { return user.role == 1 });
        this.tempUserRole = this.userRole; // shallow copy
        this.seniorUsers = this.usersList.filter(user => { return user.role == 2 });
        this.tempSeniorUsers = this.seniorUsers; // shallow copy
        this.wfmProfessionals = this.usersList.filter(user => { return user.role == 3 });
        this.tempWFMProfessionals = this.wfmProfessionals; // shallow copy
      })
    }
    
    // Add form for  user
    addUserForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    });



  // For Adding New User's
  openAddUserModal(template: TemplateRef<any>) {
    this.addUserModalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }


  // Adding Users w.r.t the Role
  addUser() {
    let user: userDTO = this.addUserForm.value;
    user.role = +user.role;
    switch (user.role) {
      case 1:
        this.verifyingExistingUser(this.userRole, user) ? alert('User is already exist') : this.userRole.push(user)
          && this.usersList.push(user)
          && (this.tempUserRole = this.userRole);
        break;
      case 2:
        this.verifyingExistingUser(this.seniorUsers, user) ? alert('User is already exist') : this.seniorUsers.push(user)
          && this.usersList.push(user)
          && (this.tempSeniorUsers = this.seniorUsers);
        break;
      case 3:
        this.verifyingExistingUser(this.wfmProfessionals, user) ? alert('User is already exist') : this.wfmProfessionals.push(user)
          && this.usersList.push(user)
          && (this.tempWFMProfessionals = this.wfmProfessionals);
        break;
    }
    this.addUserForm.reset();
  }


  // Generic function for Verifying User already existence
  verifyingExistingUser(usersList: userDTO[], user: userDTO) {
    return usersList.find(u => u.firstName == user.firstName && u.lastName == user.lastName && u.role == user.role);
  }


  // For Searching User on the basis of FirstName & LastName
  public doFilter (event: any) {
    // For User's Search
    this.userRole = this.tempUserRole;
    this.userRole = this.searchByName(this.tempUserRole, event);

    // For Senior User's Search
    this.seniorUsers = this.tempSeniorUsers;
    this.seniorUsers = this.searchByName(this.tempSeniorUsers, event);
   
    // For WFM Professional's Search
    this.wfmProfessionals = this.tempWFMProfessionals;
    this.wfmProfessionals = this.searchByName(this.tempWFMProfessionals, event);
  }

  
  // For Generic Search By First Name & Last Name 
  public searchByName(listUsers: userDTO[], name: string) {
    return listUsers.filter(
      user => (user.firstName.toLocaleLowerCase().indexOf(name.trim().toLocaleLowerCase()) > -1)
        || (user.lastName.toLocaleLowerCase().indexOf(name.trim().toLocaleLowerCase()) > -1)
    );
  }

  // For Deleting User
  removeUser(index: number) {
    this.userRole.splice(index, 1);
    this.tempUserRole.splice(index, 1);
  }


  // For Deleting Senior User
  removeSeniorUser(index: number) {
    this.seniorUsers.splice(index, 1)
    this.tempSeniorUsers.splice(index, 1)
  }


  // For Deleting WFM User
  removeWFMProfessional(index: number) {
    this.wfmProfessionals.splice(index, 1)
    this.tempWFMProfessionals.splice(index, 1)
  }
}