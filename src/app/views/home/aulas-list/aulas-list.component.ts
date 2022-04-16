import { Component, OnInit } from '@angular/core';
import { Aula } from 'src/app/shared/models/aula.model';
import { AulaService } from 'src/app/shared/service/aula.service';

@Component({
  selector: 'app-aulas-list',
  templateUrl: './aulas-list.component.html',
  styleUrls: ['./aulas-list.component.css']
})
export class AulasListComponent implements OnInit {

  aulas: Aula[] = [];

  statusAula: string;

  constructor(
    public aulaService: AulaService
  ) {
  }

  ngOnInit(): void {
    this.getAulas(2);
  }

  getAulas(alunoId: number) {
    this.aulaService.getAulasPorAluno(alunoId).subscribe(resultado => {
      this.aulas = resultado;
    });
  }

  desmarcarAula(aulaId: number) {
    this.aulaService.deleteAula(aulaId).subscribe(resultado => {
      this.aulas = resultado;
    })
  }

  verificaStatus(aulaStatus) {
    switch (aulaStatus) {
      case 'CANCELADA':
        return 'aulaCancelada';

      case 'AGENDADA':
        return 'aulaAgendada';

      case 'REALIZADA':
        return 'aulaRealizada';
    }
    // if (aulaStatus == 'CANCELADA') {

    //   return 'aulaCancelada';
    // } else {
    //   return 'aulaAgendada';
    // }
  }
}