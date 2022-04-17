import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Materia } from 'src/app/shared/models/materia.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { MateriaService } from 'src/app/shared/service/materia.service';
import { UsuarioService } from 'src/app/shared/service/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: Usuario;
  materias: Materia[];
  minhasMaterias: Materia[];

  vincularMateriaForm: FormGroup;
  novaMateriaForm: FormGroup;

  isUsuarioAluno: Boolean;

  constructor(
    private usuarioService: UsuarioService,
    private materiaService: MateriaService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUsuario();
    this.getMaterias();
  }

  getUsuario() {
    this.vincularMateriaForm = this.formBuilder.group({
      materiaId: [''],
    })

    this.novaMateriaForm = this.formBuilder.group({
      nome: [''],
    })

    this.usuarioService.getUsuario().subscribe(resultado => {
      this.usuario = resultado;

      localStorage.setItem('usuarioId', this.usuario.id.toString())

      if (this.usuario.categoria == 'ALUNO') {
        this.isUsuarioAluno = true;
      } else {
        this.isUsuarioAluno = false;
        this.getMinhasMaterias(this.usuario.id);
      }
    });

  }

  getMaterias() {
    this.materiaService.getMaterias().subscribe(resultado => {
      this.materias = resultado;
    })
  }

  getMinhasMaterias(professorId: number) {
    this.materiaService.getMateriasPorProfessor(professorId).subscribe(resultado => {
      this.minhasMaterias = resultado;
    })
  }

  vincularMateria() {
    this.materiaService.vincularMateria(this.vincularMateriaForm.value.materiaId).subscribe(resultado => {
      this.materias = resultado;
      window.location.reload();
    })
  }

  cadastrarMateria() {
    this.materiaService.cadastrarMateria(this.novaMateriaForm.value).subscribe(resultado => {
      this.materias = resultado;
      window.location.reload();
    })
  }

  verificaCategoria() {
    if (this.isUsuarioAluno) {
      return 'col-12';
    } else {
      return 'col-9';
    }
  }

  encerrarSessao() {
    this.usuarioService.encerrarSessao();

  }

}
