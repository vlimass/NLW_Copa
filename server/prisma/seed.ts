import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(){  
    const user = await prisma.user.create({
        data: {
            name: 'Fulano',
            email: 'fulaninho@gmail.com',
            avatarUrl: 'https://github.com/vlimass.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOOL1234',
            ownerId: user.id,
            
            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-12-22T12:00:00.928Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        },
    })

    await prisma.game.create({
        data: {
            date: '2022-11-03T12:00:00.928Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }
    })
}

main()