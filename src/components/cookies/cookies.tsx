import { FC, useState } from 'react'
import { Check } from 'tabler-icons-react'
import button from '@/components/generic/buttons/primary-button/button'
import { useTheme } from '@/hooks/useTheme.hook'
import Text from '@/styles/text.module.scss'
import Styles from './cookies.module.scss'


const Cookies: FC = () => {
	const { darkmode } = useTheme()

	const getCookiesBar = (): boolean => {
		const cookieBar = localStorage.getItem('cookies')

		if (cookieBar !== null) {
			return Boolean(cookieBar)
		}

		return false
	}

	const [cookiesAssigned, setCookiesAssigned] = useState<boolean>(getCookiesBar)

	const closeCookies = () => {
		localStorage.setItem('cookies', 'true')
		setCookiesAssigned(true)
	}

	return (
		<>
			{!cookiesAssigned && (
				<div
					className={`${Text.Body1Regular} ${Styles.Cookies} ${
						darkmode && Styles.CookiesDark
					}`}
				>
					<p>
						Our platform uses <span>cookies</span> to improve your studying
						experience, by working on the platform, you accessing cookies policy
					</p>
					<button
						type={'button'}
						className={Styles.CookiesButton}
						onClick={() => closeCookies()}
					>
						{/*Ok!*/}
						<Check size={24} color={'currentColor'} />
					</button>
				</div>
			)}
		</>
	)
}

export default Cookies