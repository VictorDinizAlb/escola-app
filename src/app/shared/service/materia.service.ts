import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MateriaForm } from '../models/form/materiaForm.model';
import { Materia } from '../models/materia.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  apiUrl = environment.apiBaseUrl + 'materia/';

  usuarioLogadoId: number = parseInt(localStorage.getItem('usuarioId'))

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

  public getMateriasPorProfessor(professorId: number): Observable<Materia[]> {
    return this.httpClient.get<Materia[]>(this.apiUrl + professorId)
  }

  public vincularMateria(materiaId: number): Observable<Materia[]> {
    console.log("id: ",this.usuarioLogadoId)
    return this.httpClient.get<Materia[]>(this.apiUrl + 'adicionar?materiaId=' + materiaId + '&professorId=' + this.usuarioLogadoId)
  }

  public cadastrarMateria(novaMateria: MateriaForm): Observable<Materia[]> {
    return this.httpClient.post<Materia[]>(this.apiUrl, novaMateria, this.httpOptions);
  }

}
