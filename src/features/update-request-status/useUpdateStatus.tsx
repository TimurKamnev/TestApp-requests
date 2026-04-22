import React from 'react'
import type { UpdateStatusForm } from '../../widgets/request-status-form/schema'
import { requestsApi } from '../../entities/request/api/requestsApi'

export function useUpdateStatus(id: string) {
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState<string | null>(null)

	const updateStatus = async (data: UpdateStatusForm) => {
		setLoading(true)
		setError(null)
		try {
			await requestsApi.updateStatus(id, data.status, data.comment)
		} catch (e) {
			setError((e as Error).message || 'Ошибка при обновлении статуса')
			throw e
		} finally {
			setLoading(false)
		}
	}

	return { updateStatus, loading, error }
}
