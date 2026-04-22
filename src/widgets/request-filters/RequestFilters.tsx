import { useRequestsStore } from '../../entities/request/model/requestsStore'
import type {
	RequestStatus,
	RequestPriority,
} from '../../entities/request/types/request'

export function RequestFilters() {
	const { filters, setFilters } = useRequestsStore()

	return (
		<div
			style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}
		>
			<input
				type='text'
				placeholder='Поиск по заголовку или клиенту...'
				value={filters.search ?? ''}
				onChange={e => setFilters({ search: e.target.value })}
				style={inputStyle}
			/>

			<select
				value={filters.status ?? ''}
				onChange={e =>
					setFilters({ status: (e.target.value as RequestStatus) || undefined })
				}
				style={selectStyle}
			>
				<option value=''>Все статусы</option>
				<option value='new'>Новая</option>
				<option value='in_progress'>В работе</option>
				<option value='done'>Выполнена</option>
				<option value='canceled'>Отменена</option>
			</select>

			<select
				value={filters.priority ?? ''}
				onChange={e =>
					setFilters({
						priority: (e.target.value as RequestPriority) || undefined,
					})
				}
				style={selectStyle}
			>
				<option value=''>Все приоритеты</option>
				<option value='high'>Высокий</option>
				<option value='medium'>Средний</option>
				<option value='low'>Низкий</option>
			</select>

			<select
				value={filters.sortBy ?? 'priority'}
				onChange={e =>
					setFilters({ sortBy: e.target.value as 'createdAt' | 'priority' })
				}
				style={selectStyle}
			>
				<option value='priority'>Сортировка: приоритет</option>
				<option value='createdAt'>Сортировка: дата</option>
			</select>

			<select
				value={filters.sortOrder ?? 'desc'}
				onChange={e =>
					setFilters({ sortOrder: e.target.value as 'asc' | 'desc' })
				}
				style={selectStyle}
			>
				<option value='desc'>По убыванию</option>
				<option value='asc'>По возрастанию</option>
			</select>

			<button
				onClick={() =>
					setFilters({
						search: undefined,
						status: undefined,
						priority: undefined,
						sortBy: 'priority',
						sortOrder: 'desc',
					})
				}
				style={{
					padding: '8px 16px',
					cursor: 'pointer',
					borderRadius: 6,
					border: '1px solid #e5e7eb',
				}}
			>
				Сбросить
			</button>
		</div>
	)
}

const inputStyle: React.CSSProperties = {
	padding: '8px 12px',
	borderRadius: 6,
	border: '1px solid #e5e7eb',
	fontSize: 14,
	minWidth: 260,
	outline: 'none',
}

const selectStyle: React.CSSProperties = {
	padding: '8px 12px',
	borderRadius: 6,
	border: '1px solid #e5e7eb',
	fontSize: 14,
	cursor: 'pointer',
	outline: 'none',
}
