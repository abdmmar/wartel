import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import { AddContactSchema, addContactSchema } from '@/schemas/contact'
import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { red } from '@radix-ui/colors'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiMinus, HiPlus } from 'react-icons/hi'

type AddContactFormProps = {
  onSubmit: (data: AddContactSchema) => void
  isLoading?: boolean
}

export const AddContactForm = ({ onSubmit, isLoading }: AddContactFormProps) => {
  const { formState, register, control, handleSubmit } = useForm<AddContactSchema>({
    resolver: zodResolver(addContactSchema),
    mode: 'onBlur',
    defaultValues: {
      phones: [
        {
          number: undefined,
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phones',
  })

  return (
    <AddNewForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="first_name">First name</Label>
        <Input placeholder="First name" {...register('first_name')} />
        <ErrorText>{formState.errors.first_name?.message}</ErrorText>
      </div>
      <div>
        <Label htmlFor="last_name">Last name</Label>
        <Input placeholder="Last name" {...register('last_name')} />
        <ErrorText>{formState.errors.last_name?.message}</ErrorText>
      </div>
      <div>
        <Label htmlFor="phones.0.number">Phone number</Label>
        {fields.map((field, index) => (
          <FieldArrayContainer>
            <Input
              key={field.id}
              type="tel"
              inputMode="tel"
              placeholder="Phone number"
              {...register(`phones.${index}.number`)}
            />
            <Button
              size="icon"
              onClick={() => {
                if (index === 0) {
                  append({ number: '' })
                  return
                }

                remove(index)
              }}
            >
              {index === 0 ? <HiPlus /> : <HiMinus />}
            </Button>
          </FieldArrayContainer>
        ))}
        <ErrorText>{formState.errors.phones?.message}</ErrorText>
      </div>
      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : 'Save'}
      </Button>
    </AddNewForm>
  )
}

const AddNewForm = styled.form`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`
const FieldArrayContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  :last-child {
    margin-bottom: 0;
  }
`
const ErrorText = styled.span`
  font-size: 0.75rem;
  color: ${red.red11};
`
