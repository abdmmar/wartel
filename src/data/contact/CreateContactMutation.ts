import { graphql } from "@/gql";
import { CreateContactMutation, CreateContactMutationVariables } from "@/gql/graphql";
import { MutationHookOptions, useMutation } from "@apollo/client";

const createContact = graphql(`
  mutation CreateContact(
    $first_name: String!, 
    $last_name: String!, 
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $first_name, 
        last_name: $last_name, 
        phones: { 
            data: $phones
        }
      }
    ) {
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

type CreateContactOptions = MutationHookOptions<CreateContactMutation, CreateContactMutationVariables>

export const useCreateContactMutation = (option: CreateContactOptions) => useMutation(createContact, option)