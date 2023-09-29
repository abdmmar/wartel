import { AddContactForm } from '@/components/contact/add-contact-form'
import { wrapper } from '@/utils/test-utils'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const contact = {
  firstName: 'George',
  lastName: 'Harisson',
  phoneNumber: ['08123456789', '0876543219'],
}

describe('add contact form', () => {
  test('should submit when input is correct', async () => {
    const user = userEvent.setup()
    const onSubmitMock = jest.fn()
    render(<AddContactForm onSubmit={onSubmitMock} />, { wrapper })

    const input = {
      firstName: screen.getByLabelText(/first name/i),
      lastName: screen.getByLabelText(/last name/i),
      addPhoneNumber: screen.getByTestId('phone-number-action-0'),
      phoneNumber: screen.getByTestId('phone-number-0'),
      submit: screen.getByTestId('submit-create-contact'),
    }

    await user.type(input.firstName, contact.firstName)
    await user.type(input.lastName, contact.lastName)
    await user.type(input.phoneNumber, contact.phoneNumber[0])

    await user.click(input.addPhoneNumber)
    const phoneNumberTwo = screen.getByTestId('phone-number-1')
    await user.type(phoneNumberTwo, contact.phoneNumber[1])

    await user.click(input.submit)

    expect(input.firstName).toHaveValue(contact.firstName)
    expect(input.lastName).toHaveValue(contact.lastName)
    expect(input.phoneNumber).toHaveValue(contact.phoneNumber[0])
    expect(phoneNumberTwo).toHaveValue(contact.phoneNumber[1])
    expect(onSubmitMock).toHaveBeenCalledTimes(1)
  })

  test('should show error when input is empty', async () => {
    const user = userEvent.setup()
    const onSubmitMock = jest.fn()
    render(<AddContactForm onSubmit={onSubmitMock} />, { wrapper })

    const input = {
      firstName: screen.getByLabelText(/first name/i),
      lastName: screen.getByLabelText(/last name/i),
      phoneNumber: screen.getByTestId('phone-number-0'),
      submit: screen.getByTestId('submit-create-contact'),
    }

    await user.click(input.submit)

    expect(await screen.findAllByRole('alert')).toHaveLength(3)

    expect(input.firstName).not.toHaveValue()
    expect(input.lastName).not.toHaveValue()
    expect(input.phoneNumber).not.toHaveValue()
    expect(onSubmitMock).toHaveBeenCalledTimes(0)
  })
})
