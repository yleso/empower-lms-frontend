import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/fonts.scss'
import './styles/global.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<App />
	</StrictMode>
)