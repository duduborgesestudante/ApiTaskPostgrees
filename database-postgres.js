import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DatabaseTask{ 
  async listTask() {
    let tarefa 
    tarefa = await sql`select * from tarefas`;
    return tarefa;
    
  }
  async listTaskByID(id) {
    let tarefa 
    tarefa = await sql`select * from tarefas where id = ${id}`;
    return tarefa;
    
  }

  async createTask(task) {
      const id = randomUUID();
      const titulo = task.titulo;
      const descricao = task.descricao;
      const cor = task.cor;

      await sql`insert into tarefas (id, titulo, descricao, cor) 
          values (${id}, ${titulo}, ${descricao}, ${cor})`;
  }


  async updateTask(id, tarefa) {
    const { titulo, descricao, cor} = tarefa;

    await sql`update tarefas set 
              titulo = ${titulo}, 
              descricao = ${descricao}, 
              cor = ${cor}
              where id = ${id}`;
  }
  

  async deleteTask(id) {
   
      await sql`delete from tarefas where id = ${id}`;
    
  }

}