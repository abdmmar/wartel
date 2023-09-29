const allContacts = [
  {
    __typename: "contact",
    created_at: "2023-09-28T16:56:09.15427+00:00",
    id: 26884,
    first_name: "Tony",
    last_name: "Stark",
    phones: [{ __typename: "phone", number: "8765456" }]
  },
  {
    __typename: "contact",
    created_at: "2023-09-28T16:53:43.551257+00:00",
    id: 26883,
    first_name: "Bruce",
    last_name: "Wayne",
    phones: [{ __typename: "phone", number: "987654" }]
  }
]
const favouriteContacts = [
  {
    __typename: "contact",
    created_at: "2023-09-28T16:41:22.133392+00:00",
    id: 26882,
    first_name: "George",
    last_name: "Harrison",
    phones: [{ __typename: "phone", number: "0987657" }]
  },
  {
    __typename: "contact",
    created_at: "2023-09-28T16:40:54.211192+00:00",
    id: 26880,
    first_name: "Clark",
    last_name: "Kent",
    phones: [{ __typename: "phone", number: "098765" }]
  }
]

const contactsData = {
  "contact": [...allContacts, ...favouriteContacts]
}