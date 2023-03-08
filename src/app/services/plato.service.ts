import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Platos } from '../Interfaces/tiposPlato.interface';
import { GlobalVariablesService } from './global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  message: string = '';

  constructor(private http:HttpClient, private globalVariable:GlobalVariablesService) { }

  getPlatos(): Observable<Platos[]> 
  {
    return this.http.get<Platos[]>(this.globalVariable.API_URL +'/tipo_platoyoerdi/info')
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      })
      
    )
  }
  updatePlatos(plato: Platos, id :number): Observable<Platos> {
    return this.http.put<Platos>(this.globalVariable.API_URL +`/tipo_platoyordi/update/`+ id, plato)
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      }
      )
    )
}
mostrarPlato(id: number)
{
  return this.http.get<Platos>(this.globalVariable.API_URL +'/tipo_platoyordi/info' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    })
  )
}
eliminarPlato(id: number)
{
  return this.http.delete<Platos>(this.globalVariable.API_URL +'/tipo_platoyordi/delete' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    })
  )
}
}
