import { faker } from '@faker-js/faker'
import { User, Post, Follow, Like } from '@prisma/client'

import { prisma } from './db'

async function main() {
  await clear()

  const testEmail = 'test@gmail.com'
  const num = 200

  // users
  await generate(
    1,
    'user',
    user,
    {
      email: testEmail,
      password: '$2b$08$R7LcOn0/DrWzrSK9VzWQ3.JCuW5rISpRlzrGd9EmYjeRt5fH0ooem', // 12341234
      deletedAt: null,
    },
    prisma.user
  )
  await generate(num, 'user', user, {}, prisma.user)

  const testUser = await prisma.user.findFirst({
    where: {
      email: testEmail,
    },
  })

  if (!testUser) {
    return
  }

  // posts
  await generate(
    num,
    'post',
    post,
    { userId: testUser.id, deletedAt: null },
    prisma.post
  )

  for (let i = 0; i < 10; i++) {
    const usersCount = await prisma.user.count()
    const skip = Math.floor(Math.random() * usersCount)

    const randomUser = await prisma.user.findFirst({
      take: 1,
      skip: skip,
    })

    if (!randomUser) {
      continue
    }

    // posts
    await generate(
      faker.datatype.number({ min: 10, max: 30 }),
      'post',
      post,
      { userId: randomUser.id, deletedAt: null },
      prisma.post
    )
  }
}

async function clear() {
  await prisma.follow.deleteMany({})
  await prisma.like.deleteMany({})
  await prisma.post.deleteMany({})
  await prisma.user.deleteMany({})
  console.log('🆕', 'removed all registers')
}

function user(custom) {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.name.firstName(),
    username: faker.internet.userName(),
    avatar: faker.internet.avatar(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    deletedAt: faker.datatype.boolean() ? faker.date.past() : null,
    ...custom,
  }
}

function post(custom) {
  return {
    text: faker.lorem.sentence(),
    url: faker.datatype.boolean()
      ? faker.image.imageUrl(2560, 1440, 'people', true)
      : faker.image.imageUrl(1080, 1920, 'sports', true),
    tags: faker.lorem.words(5).split(' '),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    deletedAt: faker.datatype.boolean() ? faker.date.past() : null,
    ...custom,
  }
}

function follow(custom): Follow {
  return {
    createdAt: faker.date.past(),
    ...custom,
  }
}

async function generate(number: number, name, entity, data, prisma) {
  let arr: any = []

  console.log('🔥', data)

  for (let i = 0; i < number; i++) {
    arr.push(entity({ ...data }))
  }

  console.log('✅', `${number} ${name} created`)
  return await prisma.createMany({ data: arr, skipDuplicates: true })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
