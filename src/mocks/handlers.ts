import { http, HttpResponse } from 'msw'
import { mockRequests } from './data'
import type { Request } from '../entities/request/types/request'

export const handlers = [
	http.get('/api/requests', ({ request }) => {
		const url = new URL(request.url)
		const page = Number(url.searchParams.get('page') ?? 1)
		const limit = Number(url.searchParams.get('limit') ?? 15)
		const search = url.searchParams.get('search') ?? ''

		const filtered = mockRequests.filter(
			(r: Request) => r.title.includes(search) || r.clientName.includes(search),
		)
		const total = filtered.length
		const items = filtered.slice((page - 1) * limit, page * limit)
		return HttpResponse.json({
			items,
			page,
			limit,
			total,
			hasNextPage: page * limit < total,
		})
	}),
]
