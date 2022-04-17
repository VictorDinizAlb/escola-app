import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../models/form/loginForm.model';
import { UsuarioForm } from '../models/form/usuarioForm.model';
import { Usuario } from '../models/usuario.model';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrl = environment.apiBaseUrl + 'usuario';
  apiUrlLogin = environment.apiBaseUrl + 'auth';

  jwtHelper: JwtHelperService = new JwtHelperService();

  usuarioLogado: Usuario;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  obterToken() {
    const tokenString = localStorage.getItem('access_token');

    if (tokenString) {
      const token = JSON.parse(tokenString).token;
      return token;
    }

    return null;
  }

  isAutenticado(): boolean{
    const token = this.obterToken();

    if (token) {
      const expirado = this.jwtHelper.isTokenExpired(token);
      return !expirado;
    }
    return false;
  }

  encerrarSessao() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('usuarioId');
    window.location.reload();
  }

  getUsuario() {

    const token = this.obterToken();
    if (token) {
      const usuarioId = this.jwtHelper.decodeToken(token).sub;

      return this.httpClient.get<Usuario>(this.apiUrl + '/' + usuarioId);
    }

  }

  postCriarUsuario(novoUsuario: UsuarioForm): Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.apiUrl, novoUsuario, this.httpOptions);
  }

  postLogar(usuarioLogin: LoginForm): Observable<any> {
    return this.httpClient.post<LoginForm>(this.apiUrlLogin, usuarioLogin, this.httpOptions)
  }

}
