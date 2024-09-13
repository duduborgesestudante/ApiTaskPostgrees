
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabaseTask } from './database-postgres.js'

const server = fastify();
const database = new DatabaseTask;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD):

// CREATE

server.post('/tarefas', async (request, reply) => {
    const body = request.body;
    await database.createTask(body);
    return (201, "Tarefa Criada!")
  });
  

// READE
server.get("/tarefas", async (request, reply) =>{
   
    const tarefas = await database.listTask()
    return tarefas;
})
server.get("/tarefas/:id", async (request, reply) =>{
    const tarefaID = request.params.id;
    const tarefas = await database.listTaskByID(tarefaID)
    return tarefas;
})

// UPDATE

server.put('/tarefas/:id', async (request, reply) => {
    const tarefaID = request.params.id;
    const { titulo, descricao, cor} = request.body;
    
    const alteracoes = {
        titulo: titulo,
        descricao: descricao,
        cor: cor,
    }
    await database.updateTask(tarefaID, alteracoes);

    return (reply.status(204), "Tarefa atualizada");
  });
// DELETE
server.delete("/tarefas/:id", async (request,reply) =>{
    const tarefaID = request.params.id;
    await database.deleteTask(tarefaID);

    return (reply.status(204).send(), "Tarefa Deletada");
})

server.listen({
    port: 3333
});
