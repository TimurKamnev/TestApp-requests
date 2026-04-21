import { useEffect, useState, type ReactNode } from 'react'

async function initMSW() {
	if (import.meta.env.DEV) {
		const { worker } = await import('../../mocks/browser')
		await worker.start({ onUnhandledRequest: 'bypass' })
	}
}

export function MSWProvider({ children }: { children: ReactNode }) {
	const [ready, setReady] = useState(false)

	useEffect(() => {
		initMSW().then(() => setReady(true))
	}, [])

	if (!ready) return null

	return <>{children}</>
}
