import { Component, Input, OnInit } from '@angular/core';
import { Aula } from 'src/app/shared/models/aula.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { AulaService } from 'src/app/shared/service/aula.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aulas-list',
  templateUrl: './aulas-list.component.html',
  styleUrls: ['./aulas-list.component.css']
})
export class AulasListComponent implements OnInit {

  aulas: Aula[] = [];
  statusAula: string;

  categoriaProfessor: string = environment.usuarioCategoria.professor;
  categoriaAluno: string = environment.usuarioCategoria.aluno;



  @Input() recebeUsuario: Usuario;

  constructor(
    public aulaService: AulaService
  ) {
  }

  ngOnInit(): void {
    this.getAulas(this.recebeUsuario.id, this.recebeUsuario.categoria);
  }

  getAulas(usuarioId: number, usuarioCategoria: string) {
    switch (usuarioCategoria) {
      case this.categoriaAluno:
        this.aulaService.getAulasPorAluno(usuarioId).subscribe(resultado => {
          this.aulas = resultado;
        });
        break;

      case this.categoriaProfessor:
        this.aulaService.getAulasPorProfessor(usuarioId).subscribe(resultado => {
          this.aulas = resultado;
        });
        break;

      default:
        break;
    }
  }

  desmarcarAula(aulaId: number) {
    this.aulaService.deleteAula(aulaId).subscribe(resultado => {
      this.aulas = resultado;
    })
  }

  verificaStatus(aulaStatus) {
    switch (aulaStatus) {
      case environment.aulaStatus.cancelada:
        return 'aulaCancelada';

      case environment.aulaStatus.agendada:
        return 'aulaAgendada';

      case environment.aulaStatus.realizada:
        return 'aulaRealizada';
    }
  }
}
