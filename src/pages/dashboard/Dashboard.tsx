import { useState } from 'react'
import { mockRequests } from '../../mocks/data'
import type { Request } from '../../entities/request/types/request'

export default function Dashboard() {
	const [data] = useState<Request[]>(mockRequests)

	const byStatus = {
		new: data.filter(r => r.status === 'new').length,
		in_progress: data.filter(r => r.status === 'in_progress').length,
		done: data.filter(r => r.status === 'done').length,
		canceled: data.filter(r => r.status === 'canceled').length,
	}

	const byPriority = {
		high: data.filter(r => r.priority === 'high').length,
		medium: data.filter(r => r.priority === 'medium').length,
		low: data.filter(r => r.priority === 'low').length,
	}

	const recent = [...data]
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		)
		.slice(0, 5)

	return (
		<div className='dashboard'>
			<h1>Дашборд</h1>

			<h2>По статусам</h2>
			<div className='dashboard-filter'>
				<StatCard label='Новые' value={byStatus.new} color='#3b82f6' />
				<StatCard
					label='В работе'
					value={byStatus.in_progress}
					color='#f59e0b'
				/>
				<StatCard label='Выполнены' value={byStatus.done} color='#22c55e' />
				<StatCard label='Отменены' value={byStatus.canceled} color='#ef4444' />
			</div>

			<h2>По приоритетам</h2>
			<div className='dashboard-filter'>
				<StatCard label='Высокий' value={byPriority.high} color='#ef4444' />
				<StatCard label='Средний' value={byPriority.medium} color='#f59e0b' />
				<StatCard label='Низкий' value={byPriority.low} color='#6b7280' />
			</div>

			<h2>5 последних заявок</h2>
			<div className='dashboard-list'>
				{recent.map((r, i) => (
					<div
						key={r.id}
						style={{
							borderBottom:
								i < recent.length - 1 ? '1px solid #e5e7eb' : 'none',
						}}
						className='dashboard-list-item'
					>
						<div>
							<span style={{ fontWeight: 500, fontSize: 14 }}>{r.title}</span>
							<span style={{ color: '#6b7280', fontSize: 13, marginLeft: 12 }}>
								{r.clientName}
							</span>
						</div>
						<span style={{ fontSize: 12, color: '#9ca3af' }}>
							{new Date(r.createdAt).toLocaleDateString('ru-RU')}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}

function StatCard({
	label,
	value,
	color,
}: {
	label: string
	value: number
	color: string
}) {
	return (
		<div
			style={{
				padding: '16px 24px',
				borderRadius: 10,
				border: `2px solid ${color}20`,
				background: `${color}10`,
				minWidth: 140,
			}}
		>
			<div style={{ fontSize: 32, fontWeight: 700, color }}>{value}</div>
			<div style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
				{label}
			</div>
		</div>
	)
}
