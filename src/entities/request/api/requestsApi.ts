import { apiClient } from '../../../shared/api/client'
import { toSearchParams } from '../../../shared/lib/toSearchParams'
import type {
	Request,
	PaginatedResponse,
	RequestFilter,
} from '../types/request'

export const requestsApi = {
	getList: (params: RequestFilter) =>
		apiClient
			.get('requests', {
				searchParams: toSearchParams(params),
			})
			.json<PaginatedResponse<Request>>(),

	getById: (id: string) => apiClient.get(`requests/${id}`).json<Request>(),

	updateStatus: (id: string, status: string, comment?: string) =>
		apiClient
			.patch(`requests/${id}/status`, { json: { status, comment } })
			.json<Request>(),
}
