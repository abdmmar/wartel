import { GetContactQueryOptions, useGetContactQuery } from '@/data/contact'

export const useGetContact = (options?: GetContactQueryOptions) => useGetContactQuery(options)
