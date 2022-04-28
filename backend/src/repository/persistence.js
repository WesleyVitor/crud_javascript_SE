import prisma from "../service/prisma.js";
export class TodoRepository {
  async insertTodo(todo) {
    await prisma.todo.create({
      data: todo,
    });
  }

  async getAll() {
    return await prisma.todo.findMany();
  }

  async getOne() {
    return await prisma.todo.findFirst();
  }
}
