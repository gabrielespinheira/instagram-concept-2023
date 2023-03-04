import type { NextApiRequest, NextApiResponse } from 'next'
import { jwtVerify } from 'jose'
import { prisma } from 'prisma/db'
import {
  RekognitionClient,
  DetectLabelsCommand,
} from '@aws-sdk/client-rekognition'

type Label = {
  Confidence: number
  Name: string
}

const CONFIDENCE = 98

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(404).json({ error: 'method not supported' })
  }

  const { postId } = req.body
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
    },
  })

  if (!user) {
    return res.status(401).json({ error: 'user not found' })
  }

  // post
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      deletedAt: null,
    },
  })

  // check if hashtags already exists
  if (post && post.tags) {
    return res
      .status(200)
      .json({ hashtags: post.tags, message: 'hashtags already exists' })
  }

  const photoUrl = `upload/${user.id}/${postId}.jpeg`

  console.log('🔥', photoUrl)

  // generate hashtags with AWS Rekognition
  const rekognition = new RekognitionClient({ region: process.env.AWS_REGION })

  const rekog = await rekognition.send(
    new DetectLabelsCommand({
      Image: {
        S3Object: {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Name: photoUrl,
        },
      },
    })
  )

  const labels = rekog.Labels as Label[]

  if (!labels) {
    return res.status(400).json({ error: 'Hashtags not found' })
  }

  const hashtags = labels
    .map((label: Label) => {
      if (label.Name === 'Photography') {
        return null
      }

      if (label.Confidence < CONFIDENCE) {
        return null
      }

      return label.Name.toLowerCase().replaceAll(' ', '_').trim()
    })
    .filter((n) => n) as string[]

  // attach hashtags to posts
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      tags: hashtags,
    },
  })

  return res
    .status(200)
    .json({ hashtags, message: 'hashtags generated successfully' })
}

export default handler
