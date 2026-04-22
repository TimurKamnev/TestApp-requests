import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { requestsApi } from '../../entities/request/api/requestsApi'
import { useUpdateStatus } from '../../features/update-request-status/useUpdateStatus'
import RequestStatusForm from '../../widgets/request-status-form/RequestStatusForm'
import type { Request } from '../../entities/request/types/request'
import type { UpdateStatusForm } from '../../widgets/request-status-form/schema'

const STATUS_HISTORY = [
	{ status: 'new', comment: 'Заявка создана', date: '2024-01-15T08:30:00Z' },
	{
		status: 'in_progress',
		comment: 'Взята в работу оператором',
		date: '2024-01-15T10:00:00Z',
	},
]

export default function RequestDetails() {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const [request, setRequest] = useState<Request | null>(null)
	const [loading, setLoading] = useState(true)
	const [notFound, setNotFound] = useState(false)
	const { updateStatus, error: updateError } = useUpdateStatus(id!)

	useEffect(() => {
		if (!id) return
		requestsApi
			.getById(id)
			.then(setRequest)
			.catch(() => setNotFound(true))
			.finally(() => setLoading(false))
	}, [id])

	const handleStatusUpdate = async (data: UpdateStatusForm) => {
		await updateStatus(data)
		const updated = await requestsApi.getById(id!)
		setRequest(updated)
	}

	if (loading) return <div style={center}>Загрузка...</div>
	if (notFound)
		return (
			<div style={center}>
				<p style={{ color: '#ef4444', fontSize: 18 }}>Заявка не найдена</p>
				<button onClick={() => navigate('/requests')} style={backBtn}>
					← Назад к списку
				</button>
			</div>
		)
	if (!request) return null

	return (
		<div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
			<button onClick={() => navigate('/requests')} style={backBtn}>
				← Назад к списку
			</button>

			<h1 style={{ fontSize: 22, fontWeight: 600, marginTop: 16 }}>
				{request.title}
			</h1>

			<div style={card}>
				<Field label='ID' value={`#${request.id}`} />
				<Field label='Клиент' value={request.clientName} />
				<Field label='Статус' value={request.status} />
				<Field label='Приоритет' value={request.priority} />
				<Field label='Исполнитель' value={request.assignee ?? '—'} />
				<Field label='Описание' value={request.description} />
				<Field
					label='Создана'
					value={new Date(request.createdAt).toLocaleString('ru-RU')}
				/>
				<Field
					label='Обновлена'
					value={new Date(request.updatedAt).toLocaleString('ru-RU')}
				/>
			</div>

			<h2
				style={{
					fontSize: 18,
					fontWeight: 600,
					marginTop: 24,
					marginBottom: 12,
				}}
			>
				История изменений
			</h2>
			<div style={card}>
				{STATUS_HISTORY.map((h, i) => (
					<div
						key={i}
						style={{
							padding: '8px 0',
							borderBottom:
								i < STATUS_HISTORY.length - 1 ? '1px solid #f3f4f6' : 'none',
						}}
					>
						<span style={{ fontWeight: 500 }}>{h.status}</span>
						<span style={{ color: '#6b7280', marginLeft: 12, fontSize: 13 }}>
							{h.comment}
						</span>
						<span style={{ color: '#9ca3af', marginLeft: 12, fontSize: 12 }}>
							{new Date(h.date).toLocaleString('ru-RU')}
						</span>
					</div>
				))}
			</div>

			<h2
				style={{
					fontSize: 18,
					fontWeight: 600,
					marginTop: 24,
					marginBottom: 12,
				}}
			>
				Сменить статус
			</h2>
			{updateError && (
				<div
					style={{
						padding: 12,
						background: '#fef2f2',
						color: '#ef4444',
						borderRadius: 8,
						marginBottom: 12,
					}}
				>
					{updateError}
				</div>
			)}
			<div style={card}>
				<RequestStatusForm onSubmit={handleStatusUpdate} />
			</div>
		</div>
	)
}

function Field({ label, value }: { label: string; value: string }) {
	return (
		<div
			style={{
				display: 'flex',
				gap: 12,
				padding: '8px 0',
				borderBottom: '1px solid #f3f4f6',
			}}
		>
			<span style={{ color: '#6b7280', minWidth: 120, fontSize: 14 }}>
				{label}
			</span>
			<span style={{ fontSize: 14 }}>{value}</span>
		</div>
	)
}

const center: React.CSSProperties = { textAlign: 'center', padding: 48 }
const card: React.CSSProperties = {
	background: '#f9fafb',
	borderRadius: 10,
	padding: '8px 16px',
	border: '1px solid #e5e7eb',
}
const backBtn: React.CSSProperties = {
	background: 'none',
	border: 'none',
	cursor: 'pointer',
	color: '#3b82f6',
	fontSize: 14,
	padding: 0,
}
