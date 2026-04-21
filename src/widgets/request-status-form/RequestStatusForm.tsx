import { useForm, type Resolver } from 'react-hook-form'
import { updateStatusSchema, type UpdateStatusForm } from './schema'
import { yupResolver } from '@hookform/resolvers/yup/src/index.js'

export default function RequestStatusForm({
	onSubmit,
}: {
	onSubmit: (data: UpdateStatusForm) => Promise<void>
}) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<UpdateStatusForm>({
		resolver: yupResolver(updateStatusSchema) as Resolver<UpdateStatusForm>,
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<select {...register('status')}>
				<option value='new'>New</option>
				<option value='in_progress'>In Progress</option>
				<option value='done'>Done</option>
				<option value='canceled'>Canceled</option>
			</select>
			{errors.status && <span>{errors.status.message}</span>}

			<textarea
				{...register('comment')}
				placeholder='Комментарий (необязательно)'
			/>
			{errors.comment && <span>{errors.comment.message}</span>}

			<button type='submit' disabled={isSubmitting}>
				{isSubmitting ? 'Сохранение...' : 'Сменить статус'}
			</button>
		</form>
	)
}
