import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Providers } from './app/providers/index.tsx'

async function main() {
	if (import.meta.env.DEV) {
		const { worker } = await import('./mocks/browser')
		await worker.start({ onUnhandledRequest: 'bypass' })
	}

	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<Providers />
		</StrictMode>,
	)
}

main()
