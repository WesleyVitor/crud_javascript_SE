import prisma from "../service/prisma.js";
export const insertUser = async (user) => {
  await prisma.user.create({
    data: user,
  });
};

export const getUserByUsernamePassword = async (username, password) => {
  return await prisma.user.findFirst({
    where: {
      username,
      password,
    },
  });
};
