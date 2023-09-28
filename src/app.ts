import fastify from 'fastify';

import { PrismaClient } from '@prisma/client'

export const app = fastify();

const prisma = new PrismaClient()

prisma.user.create({
    data: {
        //id: 1 - posso passar o ID se eu desejar.
        name: 'Bianca Rodrigues',
        email: 'biancar1987@gmail.com'
    }
})