import { Materia } from "./materia.model";
import { Usuario } from "./usuario.model";

export class Aula{
  id: number;
  aluno: Usuario;
  professor: Usuario;
  materia: Materia;
  dataHora: string;
  status: string;
}
