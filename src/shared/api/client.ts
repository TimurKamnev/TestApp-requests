import ky from 'ky'

export const apiClient = ky.create({
	prefix: '/api',
	hooks: {
		afterResponse: [
			async ({ response }) => {
				if (!response.ok) {
					const error = await response.json<{ message: string }>()
					throw new Error(error.message ?? 'Unknown API error')
				}
			},
		],
	},
})
