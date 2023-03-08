import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Chef } from '../Interfaces/chef.interface';
import { GlobalVariablesService } from './global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class ChefService {
  message: string = '';
  

  constructor(private http:HttpClient, private globalVariables: GlobalVariablesService) { }


  getChefs(): Observable<Chef[]> 
  {
    return this.http.get<Chef[]>(this.globalVariables.API_URL+'/chef/infoyordi')
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      })
      
    )
  }
  updateChef(chef: Chef, id :number): Observable<Chef> {
    return this.http.put<Chef>(this.globalVariables.API_URL +`/chef/updateyordi/`+ id, chef)
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      }
      )
    )
}
mostrarChef(id: number)
{
  return this.http.get<Chef>(this.globalVariables.API_URL +'/chef/infoyordi' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    })
  )
}

eliminarChef(id: number)
{
  return this.http.delete<Chef>(this.globalVariables.API_URL +'/chef/deleteyordi' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    })
  )
}

}