import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Employee } from './projects/projects/employee.model';
import { ProjectDataService } from './projects/project-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly _tokenKey = 'currentUserToken';

  constructor(private http: HttpClient, private _projectDataService: ProjectDataService) {
    
    
  }
  
  
   getToken() {
     let token = localStorage.getItem(this._tokenKey);
     return token;
  }

   isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();

    if(token == null)
    return false;

    const expires = new Date(parseInt(parseJwt(token).exp, 10) * 1000) < new Date();
    if (expires) {
      localStorage.removeItem(this._tokenKey);
      return false;
    }

    else 
      return true;
  }
  
   login(e: string, p: string):Promise<boolean> {

    return new Promise(resolve => {
      this.http.post( `${environment.apiUrl}/employees/authenticate`,
      { "email": e,
        "password": p
      }
    ).subscribe((res: any) => {
      localStorage.setItem(this._tokenKey, res.token);

      
      resolve(true);

    },(err:HttpErrorResponse)=>{
      resolve(false);
    });
    });
  }  
  

  
}

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Token = token.split('.')[1];
  const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

