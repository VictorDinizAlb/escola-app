import { Component, OnInit } from '@angular/core';
import { Aula } from 'src/app/shared/models/aula.model';
import { AulaService } from 'src/app/shared/service/aula.service';

@Component({
  selector: 'app-aulas-list',
  templateUrl: './aulas-list.component.html',
  styleUrls: ['./aulas-list.component.css']
})
export class AulasListComponent implements OnInit {

  aulas: Aula[];

  constructor(
    public aulaService: AulaService
  ) {
  }

  ngOnInit(): void {
    this.getAulas(1);
  }

  getAulas(alunoId: number) {
    this.aulaService.getAulasPorAluno(alunoId).subscribe(resultado => {
      this.aulas = resultado;
      console.log(this.aulas)
    });
  }

}
