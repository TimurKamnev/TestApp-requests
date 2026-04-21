import { createBrowserRouter } from 'react-router-dom'
import RequestsList from '../../pages/requests-list/RequestsList'
import RequestDetails from '../../pages/request-details/RequestDetails'
import Dashboard from '../../pages/dashboard/Dashboard'

export const router = createBrowserRouter([
	{ path: '/', element: <RequestsList /> },
	{ path: '/requests', element: <RequestsList /> },
	{ path: '/requests/:id', element: <RequestDetails /> },
	{ path: '/dashboard', element: <Dashboard /> },
])
