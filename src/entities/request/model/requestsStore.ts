import { create } from 'zustand'
import type { Request, RequestFilter } from '../types/request'
import { persist } from 'zustand/middleware'

type ListMode = 'pagination' | 'infinite'

interface RequestsStore {
	items: Request[]
	total: number
	hasNextPage: boolean
	loading: boolean
	error: string | null
	filters: RequestFilter
	listMode: ListMode
	setFilters: (filters: Partial<RequestFilter>) => void
	setListMode: (mode: ListMode) => void
	setItems: (items: Request[], total: number) => void
	appendItems: (items: Request[]) => void
	setLoading: (v: boolean) => void
	setError: (e: string | null) => void
	setHasNextPage: (v: boolean) => void
}

export const useRequestsStore = create<RequestsStore>()(
	persist(
		set => ({
			items: [],
			total: 0,
			hasNextPage: false,
			loading: false,
			error: null,
			listMode: 'pagination',
			filters: { page: 1, limit: 15, sortBy: 'priority', sortOrder: 'desc' },
			setFilters: f =>
				set(s => ({ filters: { ...s.filters, ...f, page: f.page ?? 1 } })),
			setListMode: mode =>
				set(s => ({
					listMode: mode,
					items: [],
					filters: { ...s.filters, page: 1 },
				})),
			setItems: (items, total) => set({ items, total }),
			appendItems: items => set(s => ({ items: [...s.items, ...items] })),
			setLoading: loading => set({ loading }),
			setError: error => set({ error }),
			setHasNextPage: hasNextPage => set({ hasNextPage }),
		}),
		{
			name: 'requests-store',
			partialize: s => ({
				filters: {
					...s.filters,
					page: s.listMode === 'infinite' ? 1 : s.filters.page,
				},
				listMode: s.listMode,
			}),
		},
	),
)
