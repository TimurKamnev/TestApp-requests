import { http, HttpResponse } from 'msw'
import { mockRequests } from './data'
import type { Request } from '../entities/request/types/request'

export const handlers = [
	http.get('/api/requests', ({ request }) => {
		const url = new URL(request.url)
		const page = Number(url.searchParams.get('page') ?? 1)
		const limit = Number(url.searchParams.get('limit') ?? 15)
		const search = url.searchParams.get('search') ?? ''
		const status = url.searchParams.get('status')
		const priority = url.searchParams.get('priority')
		const assignee = url.searchParams.get('assignee')
		const sortBy = url.searchParams.get('sortBy') ?? 'priority'
		const sortOrder = url.searchParams.get('sortOrder') ?? 'desc'

		const priorityOrder: Record<string, number> = { high: 3, medium: 2, low: 1 }

		let filtered = [...mockRequests] as Request[]

		if (search) {
			filtered = filtered.filter(
				r =>
					r.title.toLowerCase().includes(search.toLowerCase()) ||
					r.clientName.toLowerCase().includes(search.toLowerCase()),
			)
		}
		if (status) filtered = filtered.filter(r => r.status === status)
		if (priority) filtered = filtered.filter(r => r.priority === priority)
		if (assignee) filtered = filtered.filter(r => r.assignee === assignee)

		filtered.sort((a, b) => {
			if (sortBy === 'priority') {
				const diff = priorityOrder[b.priority] - priorityOrder[a.priority]
				return sortOrder === 'desc' ? diff : -diff
			}
			const diff =
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			return sortOrder === 'desc' ? diff : -diff
		})

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

	http.get('/api/requests/:id', ({ params }) => {
		const found = (mockRequests as Request[]).find(r => r.id === params.id)
		if (!found)
			return HttpResponse.json(
				{ message: 'Заявка не найдена' },
				{ status: 404 },
			)
		return HttpResponse.json(found)
	}),

	http.patch('/api/requests/:id/status', async ({ params, request }) => {
		const body = (await request.json()) as { status: string; comment?: string }
		const index = (mockRequests as Request[]).findIndex(r => r.id === params.id)
		if (index === -1)
			return HttpResponse.json(
				{ message: 'Заявка не найдена' },
				{ status: 404 },
			)
		mockRequests[index] = {
			...mockRequests[index],
			status: body.status as Request['status'],
			updatedAt: new Date().toISOString(),
		}
		return HttpResponse.json(mockRequests[index])
	}),
]
