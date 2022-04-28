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

  async getOne(todoID) {
    return await prisma.todo.findFirst({
      where: {
        id: todoID,
      },
    });
  }

  async deleteOne(todoID) {
    await prisma.todo.delete({
      where: {
        id: todoID,
      },
    });
  }

  async updateOne(todoID, newTodo) {
    await prisma.todo.update({
      where: {
        id: todoID,
      },
      data: newTodo,
    });
  }
}
