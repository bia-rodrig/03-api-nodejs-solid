import fastify from 'fastify';
import { z } from 'zod';
import { prisma } from './lib/prisma';

export const app = fastify();


app.post('/users', async (request, reply) => {
    //utilizar o zod pra fazer a validação do usuário
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6), //minimo 6 caracteres
    })

    const { name, email, password } = registerBodySchema.parse(request.body)
    // parse != safeParse
    // o parse interrompe a execução do código se der erro

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: password
        }
    })

    return reply.status(201).send()
})