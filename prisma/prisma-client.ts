import { PrismaClient } from '@prisma/client';

// Функция для создания экземпляра PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Объявляем глобальную переменную для хранения экземпляра PrismaClient
declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Используем существующий экземпляр PrismaClient или создаем новый
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Сохраняем экземпляр PrismaClient в глобальную переменную в режиме разработки
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
