import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'
import cors from '@fastify/cors'

export const app = fastify()

app.register(cors, {
  origin: "*"
})

app.post('/sign-up', async (request, response) =>{
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email()
  })

  const {username, password, email} = registerBodySchema.parse(request.body)

  const userWithSameUsername = await prisma.user.findFirst({
    where: {
      username
    }
  })

  if(userWithSameUsername) {
    return response.status(409).send('Username already exists.')
  }

  await prisma.user.create({
    data: {
      username,
      password,
      email,
    }
  })

  return response.status(201).send()
})

app.get('/user/:username', async (request, response) => {
  const usernameParams = z.object({
    username: z.string()    
  })  
  
  const { username } = usernameParams.parse(request.params)

  const user = await prisma.user.findFirst({
    where: {
      username
    }
  })

  if(!user) {
    return response.status(400).send({message: "User not found"})
  }

  return response.status(200).send(user)    
})

app.put('/update-user/:id', async(request, response) => {
  const userUpdateBody = z.object({
    username: z.string(),
    password: z.string().min(4)
  })

  const userUpdateParams = z.object({
    id: z.string(),    
  })

  const {username, password} = userUpdateBody.parse(request.body)
  const {id} = userUpdateParams.parse(request.params)

  await prisma.user.updateMany({
    where: {
      id
    },
    data: {
      username,
      password
    }
  })

  return response.status(204).send()
})