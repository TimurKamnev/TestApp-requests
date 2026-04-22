import type { Request } from "../../entities/request/types/request"

const STATUS_LABELS: Record<string, string> = {
	new: 'Новая',
	in_progress: 'В работе',
	done: 'Выполнена',
	canceled: 'Отменена',
}

const PRIORITY_LABELS: Record<string, string> = {
	low: 'Низкий',
	medium: 'Средний',
	high: 'Высокий',
}

const STATUS_COLORS: Record<string, string> = {
	new: '#3b82f6',
	in_progress: '#f59e0b',
	done: '#22c55e',
	canceled: '#ef4444',
}

const PRIORITY_COLORS: Record<string, string> = {
	low: '#6b7280',
	medium: '#f59e0b',
	high: '#ef4444',
}

interface Props {
	items: Request[]
	onRowClick: (id: string) => void
}

export function RequestsTable({ items, onRowClick }: Props) {
	if (items.length === 0) {
		return (
			<div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
				Заявок не найдено
			</div>
		)
	}

	return (
		<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
			<thead>
				<tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
					<th style={th}>ID</th>
					<th style={th}>Заголовок</th>
					<th style={th}>Клиент</th>
					<th style={th}>Статус</th>
					<th style={th}>Приоритет</th>
					<th style={th}>Дата создания</th>
					<th style={th}>Исполнитель</th>
				</tr>
			</thead>
			<tbody>
				{items.map(item => (
					<tr
						key={item.id}
						onClick={() => onRowClick(item.id)}
						style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }}
						onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
						onMouseLeave={e => (e.currentTarget.style.background = '')}
					>
						<td style={td}>#{item.id}</td>
						<td style={td}>{item.title}</td>
						<td style={td}>{item.clientName}</td>
						<td style={td}>
							<Badge
								label={STATUS_LABELS[item.status]}
								color={STATUS_COLORS[item.status]}
							/>
						</td>
						<td style={td}>
							<Badge
								label={PRIORITY_LABELS[item.priority]}
								color={PRIORITY_COLORS[item.priority]}
							/>
						</td>
						<td style={td}>
							{new Date(item.createdAt).toLocaleDateString('ru-RU')}
						</td>
						<td style={td}>{item.assignee ?? '—'}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

function Badge({ label, color }: { label: string; color: string }) {
	return (
		<span
			style={{
				display: 'inline-block',
				padding: '2px 10px',
				borderRadius: 12,
				background: color + '20',
				color,
				fontWeight: 500,
				fontSize: 12,
			}}
		>
			{label}
		</span>
	)
}

const th: React.CSSProperties = {
	padding: '10px 12px',
	fontWeight: 600,
	color: '#374151',
}
const td: React.CSSProperties = { padding: '12px 12px', color: '#111827' }
