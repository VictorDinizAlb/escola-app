import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginFormulario: FormGroup;

  loginError: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginFormulario = this.formBuilder.group({
      email: ['', [Validators.email]],
      senha: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.loginFormulario.valid) {
      this.usuarioService.postLogar(this.loginFormulario.value)
        .subscribe(resultado => {
          const access_token = JSON.stringify(resultado);
          localStorage.setItem('access_token', access_token);
          this.router.navigate(['/home']);
        }, error => {
          this.loginError = true;
        })

    }
  }


}
