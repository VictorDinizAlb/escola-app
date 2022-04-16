import { Materia } from "./materia.model";
import { Usuario } from "./usuario.model";

export class Aula{
  id: number;
  aluno: string;
  professor: string;
  materia: string;
  dataHora: string;
  status: string;
}
