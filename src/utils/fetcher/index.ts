import { GraphQLClient } from 'graphql-request'
import Error from 'next/error'

const fetcher = async (query: string, variables?: any, options?: any) => {
  try {
    let session: any = false

    if (typeof localStorage !== 'undefined') {
      const storageSession = localStorage.getItem('session') as any
      session = JSON.parse(storageSession)
    }

    const endpoint = `${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`

    const graphQLClient = new GraphQLClient(endpoint, {})

    if (!session || !session.token) {
      console.warn('❗️', 'Token not found')
    }

    if (session && session.token) {
      graphQLClient.setHeader('authorization', `Bearer ${session.token}`)
    } else if (options && options.token) {
      graphQLClient.setHeader('authorization', `Bearer ${options.token}`)
    }

    return await graphQLClient.request(query, variables)
  } catch (error: any) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('❗️', error)
    }

    const errorMessage = error.response.errors[0].message

    if (errorMessage) {
      switch (errorMessage) {
        case 'Unauthorized':
          window.location.replace('/logout')
          break
        case 'Invalid token':
          window.location.replace('/logout')
          break
        default:
          break
      }
    }

    return { error: { message: errorMessage } }
  }
}

export default fetcher
