import prisma from "../service/prisma.js";
export class TodoRepository {
  async insertTodo(todo) {
    await prisma.todo.create({
      data: todo,
    });
  }
}
