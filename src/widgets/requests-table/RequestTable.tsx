import type { Request } from "../../entities/request/types/request"

interface Props {
	items: Request[]
	onRowClick: (id: string) => void
}

export function RequestsTable({ items, onRowClick }: Props) {
	if (items.length === 0) {
		return <div>Заявок не найдено</div>
	}

	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Заголовок</th>
					<th>Клиент</th>
					<th>Статус</th>
					<th>Приоритет</th>
				</tr>
			</thead>
			<tbody>
				{items.map(item => (
					<tr key={item.id} onClick={() => onRowClick(item.id)}>
						<td>#{item.id}</td>
						<td>{item.title}</td>
						<td>{item.clientName}</td>
						<td>{item.status}</td>
						<td>{item.priority}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
