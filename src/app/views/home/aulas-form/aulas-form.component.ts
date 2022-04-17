import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Materia } from 'src/app/shared/models/materia.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { AulaService } from 'src/app/shared/service/aula.service';
import { MateriaService } from 'src/app/shared/service/materia.service';

@Component({
  selector: 'app-aulas-form',
  templateUrl: './aulas-form.component.html',
  styleUrls: ['./aulas-form.component.css']
})
export class AulasFormComponent implements OnInit {

  dataHoje = new Date();

  aulaFormulario: FormGroup;

  materias: Materia[];
  professores: Usuario[];

  materiaId: number;

  @Input() recebeUsuario: Usuario;

  constructor(
    private materiaService: MateriaService,
    private aulaService: AulaService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getMaterias();

    this.aulaFormulario = this.formBuilder.group({
      alunoId: [''],
      professorId: ['', [Validators.required]],
      materiaId: ['', [Validators.required]],
      aulaData: ['', [Validators.required]],
      aulaHora: ['', [Validators.required]],
      dataHora: ['']
    })

  }

  getMaterias() {
    this.materiaService.getMaterias().subscribe(resultado => {
      this.materias = resultado;
    })
  }

  getProfessores() {
    this.materiaService.getProfessoresPorMateria(this.materiaId).subscribe(resultado => {
      this.professores = resultado;
    })
  }

  agendarAula() {
    if (this.aulaFormulario.valid) {
      let newDate: moment.Moment = moment(this.aulaFormulario.value.aulaData).local();

      this.aulaFormulario.value.alunoId = this.recebeUsuario.id;

      this.aulaFormulario.value.dataHora = newDate.format("YYYY-MM-DD") + "T" + this.aulaFormulario.value.aulaHora;
      this.aulaService.postAula(this.aulaFormulario.value).subscribe(resultado => {
        window.location.reload();
      })
    }
  }
}
