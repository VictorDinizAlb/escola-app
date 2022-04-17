import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuarioCriado: Usuario;

  cadastroFormulario: FormGroup;

  cadastroError: boolean;
  senhasDiferentes: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cadastroFormulario = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.email]],
      senha: ['', [Validators.required]],
      senhaConfirm: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.cadastroFormulario.valid) {
      if (this.cadastroFormulario.value.senha == this.cadastroFormulario.value.senhaConfirm) {

        this.usuarioService.postCriarUsuario(this.cadastroFormulario.value).subscribe(resultado => {
          this.usuarioCriado = resultado;
          this.router.navigate(['/login']);
        }, error => {
          this.cadastroError = true;
        })

        this.senhasDiferentes = false;
      } else {
        this.senhasDiferentes = true;
      }
    }
  }

}
