import React from 'react'
import { requestsApi } from '../../entities/request/api/requestsApi'
import { useRequestsStore } from '../../entities/request/model/requestsStore'
import { useDebouncedValue } from '../../shared/lib/useDebouncedValue'

export function useRequestsList() {
	const store = useRequestsStore()
	const debouncedSearch = useDebouncedValue(store.filters.search, 400)

	const fetchRequests = React.useCallback(async () => {
		const isAppend = store.listMode === 'infinite' && store.filters.page > 1
		store.setLoading(true)
		store.setError(null)
		try {
			const data = await requestsApi.getList({
				...store.filters,
				search: debouncedSearch,
			})
			if (isAppend) {
				store.appendItems(data.items)
			} else {
				store.setItems(data.items, data.total)
			}
			store.setHasNextPage(data.hasNextPage)
		} catch (e) {
			store.setError((e as Error).message)
		} finally {
			store.setLoading(false)
		}
	}, [store.filters, store.listMode, debouncedSearch])

	React.useEffect(() => {
		fetchRequests()
	}, [fetchRequests])
}
