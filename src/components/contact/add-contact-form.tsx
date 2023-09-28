import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import { ALPHANUMERIC_REGEX, AddContactSchema, addContactSchema } from '@/schemas/contact'
import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { red } from '@radix-ui/colors'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { HiMinus, HiPlus } from 'react-icons/hi'

type AddContactFormProps = {
  onSubmit: (data: AddContactSchema) => void
  isLoading?: boolean
}

export const AddContactForm = ({ onSubmit, isLoading }: AddContactFormProps) => {
  const { formState, register, control, handleSubmit, setValue } = useForm<AddContactSchema>({
    resolver: zodResolver(addContactSchema),
    mode: 'onBlur',
    defaultValues: {
      first_name: '',
      last_name: '',
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
        <Controller
          control={control}
          name="first_name"
          render={({ field }) => (
            <Input
              {...field}
              autoFocus
              placeholder="First name"
              onChange={(e) => field.onChange(e.target.value.replace(ALPHANUMERIC_REGEX, ''))}
            />
          )}
        />
        <ErrorText>{formState.errors.first_name?.message}</ErrorText>
      </div>
      <div>
        <Label htmlFor="last_name">Last name</Label>
        <Controller
          control={control}
          name="last_name"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Last name"
              onChange={(e) => field.onChange(e.target.value.replace(ALPHANUMERIC_REGEX, ''))}
            />
          )}
        />
        <ErrorText>{formState.errors.last_name?.message}</ErrorText>
      </div>
      <div>
        <Label htmlFor="phones.0.number">Phone number</Label>
        {fields.map((field, index) => (
          <FieldArrayContainer key={field.id}>
            <Input
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
