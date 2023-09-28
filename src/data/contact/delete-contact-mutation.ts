import { graphql } from "@/gql";
import { DeleteContactMutation, DeleteContactMutationVariables } from "@/gql/graphql";
import { MutationHookOptions, useMutation } from "@apollo/client";

const DELETE_CONTACT_MUTATION = graphql(` 
mutation DeleteContact($id: Int!) {
  delete_contact(where: {
    id: {
      _eq: $id
    }
  }) {
    returning {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
}
`)

export type DeleteContactMutationOptions = MutationHookOptions<DeleteContactMutation, DeleteContactMutationVariables>

export const useDeleteContactMutation = (options?: DeleteContactMutationOptions) => useMutation(DELETE_CONTACT_MUTATION, options)