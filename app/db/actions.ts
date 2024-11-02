"use server"
import { User, Prisma, PrismaClient } from "@prisma/client";
// import { prisma } from "@/lib/prisma";

const prisma = new PrismaClient()

export async function fetchUser(userId: string) {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    });
}
export async function fetchUserByEmail(email: string) {
    return prisma.user.findFirst({
        where: {
           email: {
            equals: email,
            mode: 'insensitive'
           }
        }
    });
}


export async function updateUser(user: User) {
    console.log('Updating user:', user);
    // AM: Current prevent email from being updated
    // will become out of sync with auth record
    const { email,createdAt,id, ...updateData } = user;
    await prisma.user.update({
        where: {
            id: user.id
        },
        data: updateData
    });
}


