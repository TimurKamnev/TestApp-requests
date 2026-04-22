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
				<p className='not-found'>Заявка не найдена</p>
				<button onClick={() => navigate('/')} style={backBtn}>
					← Назад к списку
				</button>
			</div>
		)
	if (!request) return null

	return (
		<div className='request-detail'>
			<button onClick={() => navigate('/')} style={backBtn}>
				← Назад к списку
			</button>

			<h1>{request.title}</h1>

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

			<h2>История изменений</h2>
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
						<span className='history-status'>{h.status}</span>
						<span className='history-status'>{h.comment}</span>
						<span className='history-status'>
							{new Date(h.date).toLocaleString('ru-RU')}
						</span>
					</div>
				))}
			</div>

			<h2>Сменить статус</h2>
			{updateError && <div className='error-message'>{updateError}</div>}
			<div style={card}>
				<RequestStatusForm onSubmit={handleStatusUpdate} />
			</div>
		</div>
	)
}

function Field({ label, value }: { label: string; value: string }) {
	return (
		<div className='request-field'>
			<span className='request-field-label'>{label}</span>
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
