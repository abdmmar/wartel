import { graphql } from '@/gql'
import { EditContactMutation, EditContactMutationVariables } from '@/gql/graphql'
import { MutationHookOptions, useMutation } from '@apollo/client'

const EDIT_CONTACT_MUTATION = graphql(`
  mutation EditContact($id: Int!, $input: contact_set_input) {
    update_contact_by_pk(pk_columns: {id: $id}, _set: $input) {
      id
      created_at
      first_name
      last_name
      phones {
        number
      }
    }
  }
`)

export type EditContactMutationOptions = MutationHookOptions<
  EditContactMutation,
  EditContactMutationVariables
>

export const useEditContactMutation = (option?: EditContactMutationOptions) =>
  useMutation(EDIT_CONTACT_MUTATION, option)
