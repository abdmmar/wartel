import { GetContactsQueryOptions, useGetContactsQuery } from "@/data/contact";

export const useGetContacts = (options?: GetContactsQueryOptions) => useGetContactsQuery(options)