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
	} = useRequestsStore()
	useRequestsList()

	const totalPages = Math.ceil(total / filters.limit)

	return (
		<div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: 20,
				}}
			>
				<h1 style={{ fontSize: 24, fontWeight: 600 }}>Каталог заявок</h1>
				<div style={{ display: 'flex', gap: 8 }}>
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

			{error && (
				<div
					style={{
						padding: 16,
						background: '#fef2f2',
						color: '#ef4444',
						borderRadius: 8,
						marginBottom: 16,
					}}
				>
					Ошибка загрузки: {error}
				</div>
			)}

			{loading && items.length === 0 ? (
				<div style={{ textAlign: 'center', padding: 48, color: '#6b7280' }}>
					Загрузка...
				</div>
			) : (
				<RequestsTable
					items={items}
					onRowClick={id => navigate(`/requests/${id}`)}
				/>
			)}

			{listMode === 'pagination' && totalPages > 1 && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 8,
						marginTop: 24,
					}}
				>
					<button
						disabled={filters.page === 1}
						onClick={() => setFilters({ page: filters.page - 1 })}
						style={pageBtn}
					>
						← Назад
					</button>
					<span style={{ fontSize: 14, color: '#6b7280' }}>
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
