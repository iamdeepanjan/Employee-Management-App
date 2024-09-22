import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch } from './branch';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseURL:string = "http://localhost:3000";

  private http = inject(HttpClient);

  getAllBranches():Observable<Branch[]>{
    return this.http.get<Branch[]>(`${this.baseURL}/branches`);
  }
}
