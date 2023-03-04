import type { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'
import { jwtVerify } from 'jose'
import { v4 as uuidv4 } from 'uuid'
import S3 from 'aws-sdk/clients/s3'

import { prisma } from 'prisma/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(404).json({ error: 'method not supported' })
  }

  const { stream } = req.body
  const authorization = req.headers.authorization

  // TODO: validate image size

  if (!authorization) {
    return res.status(401).json({ error: 'permission denied' })
  }

  let [, token] = authorization?.trim().split(' ')

  const userToken: any = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.GUARD_SIGNATURE)
  )

  if (!userToken) {
    return res.status(401).json({ error: 'token not valid' })
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userToken.payload.sub,
      email: userToken.payload.email,
      deletedAt: null,
    },
  })

  if (!user) {
    return res.status(401).json({ error: 'user not found' })
  }

  // AWS S3 Object
  const s3 = new S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    signatureVersion: 'v4',
  })

  const buf = Buffer.from(
    stream.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  )

  const photoUrl = `avatar/${user.id}.jpeg`
  const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${photoUrl}`
  const optimized = await sharp(buf)
    .resize(300, 300)
    .jpeg({ quality: 90 })
    .toBuffer()

  const data = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: photoUrl,
    Body: optimized,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
  } as any

  // upload to Amazon S3
  await Promise.resolve(
    s3.putObject(data, function (err, data) {
      if (err) {
        return res.status(401).json({ error: 'upload error' })
      }
      return data
    })
  )

  // save profile avatar
  const avatar = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      avatar: url,
    },
  })

  return res.status(200).json({ upload: true, avatar })
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
}

export default handler
