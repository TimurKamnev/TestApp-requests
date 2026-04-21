import { RouterProvider } from 'react-router-dom'
import { router } from '../router'
import { MSWProvider } from './MSWProvider'

export function Providers() {
	return (
		<MSWProvider>
			<RouterProvider router={router} />
		</MSWProvider>
	)
}
