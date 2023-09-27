import 'dotenv/config';
import { z } from 'zod';

//process.env: {NODE_ENV: 'dev, ...} -> é um objeto. Por isso o zod valida sendo do tipo objeto

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
	PORT: z.coerce.number().default(3333) //pega o dado e converte para o formato q desejamos
});

const _env = envSchema.safeParse(process.env); //tenta validar o process.env pra ver se ele tem as informações descritas no envSchema

if (_env.success === false){
	console.error('❌Invalid environment variables', _env.error.format()); // format: pega todos os erros e formata de uma maneira mais amigável

	throw new Error ('Invalid environment variable'); //derruba a aplicação
}

export const env = _env.data;