import { FC, PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme.hook'
import Cookies from '../components/cookies/cookies'
import Vars from '../vars/vars.json'
import Styles from './layout.module.scss'
import Navbar from './navbar/navbar'
import Sidebar from './sidebar/sidebar'


const Layout: FC<PropsWithChildren> = ({ children }) => {
	const { darkmode } = useTheme()

	const path = useLocation().pathname
	if (path === '/login' || path === '/register') return <>{children}</>

	return (
		<>
			<h1 className={Styles.Headline}>
				{Vars.company} learning management system by AALT Global
			</h1>
			<div className={`${Styles.Page} ${darkmode && Styles.PageDark}`}>
				<Sidebar />
				<div className={Styles.PageRight}>
					<Navbar />
					<main className={Styles.PageMain}>
						<div className={Styles.MainContent}>{children}</div>
					</main>
				</div>
			</div>
			<Cookies />
		</>
	)
}

export default Layout