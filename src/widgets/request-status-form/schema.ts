import * as yup from 'yup'

const VALID_STATUSES = ['new', 'in_progress', 'done', 'canceled'] as const

export const updateStatusSchema = yup.object({
	status: yup
		.mixed<(typeof VALID_STATUSES)[number]>()
		.oneOf([...VALID_STATUSES], 'Недопустимый статус')
		.required('Статус обязателен'),
	comment: yup
		.string()
		.optional()
		.max(500, 'Комментарий не может быть длиннее 500 символов'),
})

export type UpdateStatusForm = yup.InferType<typeof updateStatusSchema>
