import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aula } from '../models/aula.model';
import { Materia } from '../models/materia.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  apiUrl = environment.apiBaseUrl + 'aula/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAula(): Aula{
    let aula: Aula = new Aula();
    let aluno: Usuario = new Usuario()
    let professor: Usuario = new Usuario()
    let materia: Materia = new Materia()
    aula.id = 1;
    aula.aluno = aluno;
    aula.professor= professor;
    aula.materia= materia;
    aula.dataHora = "data";
    aula.status = "status";

    return aula;
  }

  public getAulasPorAluno(alunoId: number): Observable<Aula[]> {
    return this.httpClient.get<Aula[]>(this.apiUrl + 'aluno/' + alunoId)
  }

  public getAulasPorProfessor(professorId: number): Observable<Aula[]> {
    return this.httpClient.get<Aula[]>(this.apiUrl + 'professor/' + professorId);
  }

  public deleteAula(aulaId: number): Observable<Aula[]> {
    return this.httpClient.delete<Aula[]>(this.apiUrl + aulaId);
  }

}
