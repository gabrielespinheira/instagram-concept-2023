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

  const { stream, text } = req.body
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
      id: userToken.sub,
      email: userToken.email,
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

  const postId = uuidv4()
  const photoUrl = `${user.id}/${postId}.jpeg`
  const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${photoUrl}`
  const optimized = await sharp(buf).jpeg({ quality: 100 }).toBuffer()

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

  // save post
  const post = await prisma.post.create({
    data: {
      id: postId,
      userId: user.id,
      url,
      text,
    },
  })

  return res.status(200).json({ upload: true, post })
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
}

export default handler
