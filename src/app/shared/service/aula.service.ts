import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aula } from '../models/aula.model';
import { AulaForm } from '../models/form/aulaForm.model';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  apiUrl = environment.apiBaseUrl + 'aula/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public postAula(aula: AulaForm): Observable<Aula> {
    return this.httpClient.post<Aula>(this.apiUrl, aula, this.httpOptions);
  }

  public getAulasPorAluno(alunoId: number): Observable<Aula[]> {
    return this.httpClient.get<Aula[]>(this.apiUrl + 'aluno/' + alunoId);
  }

  public getAulasPorProfessor(professorId: number): Observable<Aula[]> {
    return this.httpClient.get<Aula[]>(this.apiUrl + 'professor/' + professorId);
  }

  public deleteAula(aulaId: number): Observable<Aula[]> {
    return this.httpClient.delete<Aula[]>(this.apiUrl + aulaId);
  }

}
