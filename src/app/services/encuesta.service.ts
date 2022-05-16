import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Encuesta } from "../models/encuesta";
import { EncuestaConstants } from './encuestasConstants';


@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  listEncuesta: Encuesta[] = [];
  errorMessage: any;

  constructor(private http: HttpClient) { }

  getEncuestas() {
    //return this.listEncuesta.slice();
    const path = EncuestaConstants.URL_PATH_ENCUESTAS;
    return this.http
      .get<Encuesta[]>(path)
      .pipe(
        retry(3),
        catchError(
          this.handleError<Encuesta[]>('listEncuesta', null)
        )
      );
  }

  getCantidadPorGeneroMusical() {
    //return this.listEncuesta.slice();
    const path = EncuestaConstants.URL_PATH_CANTIDAD_GENERO_MUSICAL;
    return this.http
      .get<Encuesta[]>(path)
      .pipe(
        retry(3),
        catchError(
          this.handleError<Encuesta[]>('cantidad-por-genero-musical', null)
        )
      );
  }
  

  eliminarEncuesta(index: number) {
    this.listEncuesta.splice(index, 1);
  }

  agregarEncuesta(encuesta: Encuesta) {
    this.listEncuesta.unshift(encuesta);
  }

  getEncuesta(index: number) {
    return this.listEncuesta[index];
  }

  editEncuesta(encuesta: Encuesta, idEncuesta: number){
    this.listEncuesta[idEncuesta].correo = encuesta.correo;
    this.listEncuesta[idEncuesta].generoMusical = encuesta.generoMusical;
  }

  createEncuesta(encuesta: Encuesta){
    this.http.post<any>(EncuestaConstants.URL_PATH_ENCUESTAS, encuesta).subscribe({
      next: data => {
         console.log(data);
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('error!', error);
      }
    })
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      return of(result as T);
    };
  }


}
