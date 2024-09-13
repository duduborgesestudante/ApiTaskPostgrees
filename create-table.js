import { sql } from './db.js'

sql`
  CREATE TABLE tarefas (
      id text PRIMARY KEY,
      titulo character varying(255),
      descricao character varying(255),
      cor character varying(255)
  );
`.then(() => {
  console.log('tabela criada');
})