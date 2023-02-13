import { gql } from 'graphql-request'

export const queryProfile = gql`
  query Profile {
    profile {
      email
      name
      username
      createdAt
    }
  }
`

export const mutationAuthLogin = gql`
  mutation Mutation($email: NonEmptyString, $password: NonEmptyString) {
    login(email: $email, password: $password) {
      user {
        email
        name
        username
        createdAt
      }
      token
    }
  }
`

export const mutationAuthRegister = gql`
  mutation Register(
    $email: NonEmptyString
    $password: NonEmptyString
    $name: NonEmptyString
    $username: NonEmptyString
  ) {
    register(
      email: $email
      password: $password
      name: $name
      username: $username
    ) {
      user {
        email
        name
        username
      }
      token
    }
  }
`
