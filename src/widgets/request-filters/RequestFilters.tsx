import { useRequestsStore } from '../../entities/request/model/requestsStore'

export default function RequestFilters() {
	const { filters, setFilters } = useRequestsStore()

	return (
		<div>
			<input
				type='text'
				placeholder='Поиск...'
				value={filters.search ?? ''}
				onChange={e => setFilters({ search: e.target.value })}
			/>

			<select
				value={filters.status ?? ''}
				onChange={e =>
					setFilters({ status: (e.target.value as never) || undefined })
				}
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
					setFilters({ priority: (e.target.value as never) || undefined })
				}
			>
				<option value=''>Все приоритеты</option>
				<option value='high'>Высокий</option>
				<option value='medium'>Средний</option>
				<option value='low'>Низкий</option>
			</select>
		</div>
	)
}
