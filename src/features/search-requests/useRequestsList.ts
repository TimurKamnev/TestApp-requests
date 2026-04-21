import React from 'react'
import { requestsApi } from '../../entities/request/api/requestsApi'
import { useRequestsStore } from '../../entities/request/model/requestsStore'
import { useDebouncedValue } from '../../shared/lib/useDebouncedValue'

export function useRequestsList() {
	const store = useRequestsStore()
	const debouncedSearch = useDebouncedValue(store.filters.search, 400)

	const fetchRequests = React.useCallback(async () => {
		store.setLoading(true)
		store.setError(null)
		try {
			const data = await requestsApi.getList({
				...store.filters,
				search: debouncedSearch,
			})
			store.setItems(data.items, data.total)
		} catch (e) {
			store.setError((e as Error).message)
		} finally {
			store.setLoading(false)
		}
	}, [store.filters, debouncedSearch])

	React.useEffect(() => {
		fetchRequests()
	}, [fetchRequests])
}
