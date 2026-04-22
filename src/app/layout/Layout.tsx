import { Link, Outlet, useLocation } from 'react-router-dom'

export function Layout() {
	const { pathname } = useLocation()

	return (
		<>
			<nav
				style={{
					display: 'flex',
					gap: 24,
					padding: '12px 24px',
					borderBottom: '1px solid #e5e7eb',
					background: 'white',
				}}
			>
				<Link
					to='/'
					style={navLink(pathname === '/' || pathname.startsWith('/requests'))}
				>
					Заявки
				</Link>
				<Link to='/dashboard' style={navLink(pathname === '/dashboard')}>
					Дашборд
				</Link>
			</nav>
			<Outlet />
		</>
	)
}

const navLink = (active: boolean): React.CSSProperties => ({
	fontSize: 14,
	fontWeight: active ? 600 : 400,
	color: active ? '#111827' : '#6b7280',
	textDecoration: 'none',
	borderBottom: active ? '2px solid #111827' : '2px solid transparent',
	paddingBottom: 4,
})
