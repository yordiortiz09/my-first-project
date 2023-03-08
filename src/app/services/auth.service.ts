import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { User } from '../Interfaces/user.interface';
import { GlobalVariablesService } from './global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userRole: number=0;
  
 
  private token: string | null = null;
  private role: string | null = null;
  
  isValid(): boolean {
    const token = localStorage.getItem('token');
    return true;
  }

  constructor(private http: HttpClient, private globalVariable: GlobalVariablesService) {}
  
  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  verifyToken(token: string) {
    return this.http.get<boolean>(this.globalVariable.API_URL+`/verifyToken`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  async getUserRole() {
    try {
      const response: any = await this.http.get(this.globalVariable.API_URL +'/usuario/rol').toPromise();
      return response.rol_id;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  getStatus() {
    try {
      return this.http.get(this.globalVariable.API_URL+'/usuario/status').toPromise();
    } catch (error) {
      console.log(error);
      return null;
    }
  }


 
  // getStatus(status: boolean) {
  //   return this.http.get<boolean>(this.globalVariable.API_URL+'/usuario/status'), {
  //   };
  // }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol_id');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }
  deleteUser(id: number)
  {
    return this.http.delete(this.globalVariable.API_URL + '/user/delete' + '/' + id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  info(id: number)
  {
    return this.http.get<User>(this.globalVariable.API_URL +'/user' + '/' + id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  login(user: User)
  {

      return this.http.post<User>(this.globalVariable.API_URL + '/user/registro' , user) 
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
      
  }
  getUsers(): Observable<User[]> 
  {
    return this.http.get<User[]>(this.globalVariable.API_URL + '/users')
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

updateUserRoleAndStatus(userId: number, roleId: number, status: boolean): Observable<User> {
  const body = { rol_id: roleId, status: status };
  const url = `${this.globalVariable.API_URL + '/user/update'}/${userId}`;
  const loggedInUserId = localStorage.getItem('id');
  if (loggedInUserId && +loggedInUserId === userId) {
    return throwError(() => alert('No se puede actualizar el propio perfil.'));
  }
  return this.http.put<User>(url, body);
}

  private handleError(error: HttpErrorResponse)
  {
    if (error.status === 0) {
     
      console.error('Ha ocurrido un error:', error.error);
    } else {
     
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Vuelva a intentar más tarde.'));
  }


  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
}