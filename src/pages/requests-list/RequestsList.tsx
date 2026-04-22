import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRequestsStore } from '../../entities/request/model/requestsStore'
import { useRequestsList } from '../../features/search-requests/useRequestsList'
import { RequestsTable } from '../../widgets/requests-table/RequestTable'
import { RequestFilters } from '../../widgets/request-filters/RequestFilters'

export default function RequestsList() {
	const navigate = useNavigate()
	const {
		items,
		total,
		loading,
		error,
		filters,
		setFilters,
		listMode,
		setListMode,
		hasNextPage,
	} = useRequestsStore()
	useRequestsList()

	const sentinelRef = useRef<HTMLDivElement>(null)
	const totalPages = Math.ceil(total / filters.limit)

	useEffect(() => {
		if (listMode !== 'infinite') return
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && hasNextPage && !loading) {
					setFilters({ page: filters.page + 1 })
				}
			},
			{ threshold: 0.1 },
		)
		if (sentinelRef.current) observer.observe(sentinelRef.current)
		return () => observer.disconnect()
	}, [listMode, hasNextPage, loading, filters.page])

	return (
		<div className='request-list'>
			<div className='request-list-header'>
				<h1>Каталог заявок</h1>
				<div className='request-list-btns'>
					<button
						onClick={() => setListMode('pagination')}
						style={modeBtn(listMode === 'pagination')}
					>
						Пагинация
					</button>
					<button
						onClick={() => setListMode('infinite')}
						style={modeBtn(listMode === 'infinite')}
					>
						Бесконечный скролл
					</button>
				</div>
			</div>

			<RequestFilters />

			{error && <div className='error-message'>Ошибка загрузки: {error}</div>}

			{loading && items.length === 0 ? (
				<div className='loading-message'>Загрузка...</div>
			) : (
				<RequestsTable
					items={items}
					onRowClick={id => navigate(`/requests/${id}`)}
				/>
			)}

			{listMode === 'infinite' && (
				<>
					<div ref={sentinelRef} style={{ height: 1 }} />
					{loading && items.length > 0 && (
						<div className='loading-message'>Загружаем ещё...</div>
					)}
					{!hasNextPage && items.length > 0 && (
						<div className='no-more'>Больше заявок нет</div>
					)}
				</>
			)}

			{listMode === 'pagination' && totalPages > 1 && (
				<div
					className='pagination-list'
				>
					<button
						disabled={filters.page === 1}
						onClick={() => setFilters({ page: filters.page - 1 })}
						style={pageBtn}
					>
						← Назад
					</button>
					<span className='pagination-pages'>
						Страница {filters.page} из {totalPages}
					</span>
					<button
						disabled={filters.page >= totalPages}
						onClick={() => setFilters({ page: filters.page + 1 })}
						style={pageBtn}
					>
						Вперёд →
					</button>
				</div>
			)}
		</div>
	)
}

const modeBtn = (active: boolean): React.CSSProperties => ({
	padding: '8px 16px',
	borderRadius: 6,
	cursor: 'pointer',
	fontSize: 14,
	border: '1px solid #e5e7eb',
	background: active ? '#111827' : 'white',
	color: active ? 'white' : '#111827',
})

const pageBtn: React.CSSProperties = {
	padding: '8px 16px',
	borderRadius: 6,
	cursor: 'pointer',
	border: '1px solid #e5e7eb',
	background: 'white',
}
