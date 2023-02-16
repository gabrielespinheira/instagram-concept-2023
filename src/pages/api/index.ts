import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: boolean
}

function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
  return res.status(200).json({ status: true })
}

export default handler
