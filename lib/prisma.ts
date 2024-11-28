import { PrismaClient } from '@prisma/client'
import exp from 'constants'

const PrismaClientSingleton = () =>{
    return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof PrismaClientSingleton> 

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined}

const prisma = globalForPrisma.prisma ??  PrismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma