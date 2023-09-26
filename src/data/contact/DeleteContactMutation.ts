import { graphql } from "@/gql";
import { DeleteContactMutation, DeleteContactMutationVariables } from "@/gql/graphql";
import { MutationHookOptions, useMutation } from "@apollo/client";

const deleteContact = graphql(` 
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

type DeleteContactOptions = MutationHookOptions<DeleteContactMutation, DeleteContactMutationVariables>

export const useDeleteContactMutation = (option: DeleteContactOptions) => useMutation(deleteContact, option)