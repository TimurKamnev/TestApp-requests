import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../layout/Layout'
import RequestsList from '../../pages/requests-list/RequestsList'
import RequestDetails from '../../pages/request-details/RequestDetails'
import Dashboard from '../../pages/dashboard/Dashboard'

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{ path: '/', element: <RequestsList /> },
 			{ path: '/requests/:id', element: <RequestDetails /> },
			{ path: '/dashboard', element: <Dashboard /> },
		],
	},
])
