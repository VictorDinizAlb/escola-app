import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Materia } from '../models/materia.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  apiUrl = environment.apiBaseUrl + 'materia/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getMaterias(): Observable<Materia[]> {
    return this.httpClient.get<Materia[]>(this.apiUrl)
  }

  public getProfessoresPorMateria(materiaId: number): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.apiUrl + "professor/" + materiaId)
  }

}
