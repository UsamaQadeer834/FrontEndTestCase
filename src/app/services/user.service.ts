import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userDataURL = '../../assets/employees.json';
    constructor(private http: HttpClient) { }

    // Reading User's Data from the Employee Json File
    getUserData(): Observable<any> {
        return this.http.get(this.userDataURL)
    }
}
