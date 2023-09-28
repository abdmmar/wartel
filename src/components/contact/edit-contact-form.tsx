import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import { GetContactQuery } from '@/gql/graphql'
import { ALPHANUMERIC_REGEX, EditContactSchema, editContactSchema } from '@/schemas/contact'
import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { red } from '@radix-ui/colors'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'

type EditContactFormProps = {
  onSubmit: (data: EditContactSchema) => void
  defaultValue?: GetContactQuery['contact_by_pk']
  isLoading?: boolean
}

export const EditContactForm = ({ onSubmit, isLoading, defaultValue }: EditContactFormProps) => {
  const { formState, control, handleSubmit, reset } = useForm<EditContactSchema>({
    resolver: zodResolver(editContactSchema),
    mode: 'onBlur',
  })

  React.useEffect(() => {
    if (defaultValue?.first_name && defaultValue?.last_name) {
      reset(defaultValue)
    }
  }, [defaultValue])

  return (
    <EditForm onSubmit={handleSubmit(onSubmit)}>
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
        {defaultValue?.phones.map((field, index) => (
          <Input
            type="tel"
            inputMode="tel"
            placeholder="Phone number"
            value={field.number}
            disabled
          />
        ))}
      </div>
      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : 'Save'}
      </Button>
    </EditForm>
  )
}

const EditForm = styled.form`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`
const ErrorText = styled.span`
  font-size: 0.75rem;
  color: ${red.red11};
`
