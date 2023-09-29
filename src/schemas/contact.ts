import * as z from "zod";

export const ALPHANUMERIC_REGEX = /[^a-zA-Z0-9 ]/g

export const addContactSchema = z.object({
  first_name: z.string({ required_error: 'Please enter the first name of the contact' }).nonempty({ message: 'Please enter the first name of the contact' }),
  last_name: z.string({ required_error: 'Please enter the last name of the contact' }).nonempty({ message: 'Please enter the last name of the contact' }),
  phones: z.array(z.object({ number: z.string().nonempty({ message: 'Please enter at least one phone number for the contact' }) }), { required_error: 'Please enter at least one phone number for the contact' })
})

export type AddContactSchema = z.infer<typeof addContactSchema>

export const editContactSchema = z.object({
  first_name: z.string({ required_error: 'Please enter the first name of the contact' }).nonempty({ message: 'Please enter the first name of the contact' }),
  last_name: z.string({ required_error: 'Please enter the last name of the contact' }).nonempty({ message: 'Please enter the last name of the contact' }),
})

export type EditContactSchema = z.infer<typeof editContactSchema>