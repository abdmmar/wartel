import { graphql } from '@/gql'
import { CreateContactMutation, CreateContactMutationVariables } from '@/gql/graphql'
import { MutationHookOptions, useMutation } from '@apollo/client'

const CREATE_CONTACT_MUTATION = graphql(`
  mutation CreateContact(
    $first_name: String!
    $last_name: String!
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: { first_name: $first_name, last_name: $last_name, phones: { data: $phones } }
    ) {
      returning {
        id
        first_name
        last_name
        created_at
        phones {
          number
        }
      }
    }
  }
`)

export type CreateContactMutationOptions = MutationHookOptions<
  CreateContactMutation,
  CreateContactMutationVariables
>

export const useCreateContactMutation = (option?: CreateContactMutationOptions) =>
  useMutation(CREATE_CONTACT_MUTATION, option)
