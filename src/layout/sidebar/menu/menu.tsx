import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth.hook'
import { useTheme } from '@/hooks/useTheme.hook'
import { AdminMenuData, MenuData } from './menu.data'
import Styles from './menu.module.scss'


const Menu: FC = () => {
	const { darkmode } = useTheme()

	const { user } = useAuth()
	const isUserAdmin = user?.access_level === 4

	return (
		<nav className={Styles.Menu}>
			{MenuData.map(data => (
				<NavLink
					to={data.path}
					key={data.path}
					className={({ isActive }) =>
						`${Styles.MenuItem} ${darkmode && Styles.MenuItemDark} ${
							isActive &&
							(!darkmode ? Styles.MenuItemActive : Styles.MenuItemActiveDark)
						}`
					}
				>
					{/*<div>*/}
					{data.icon}
					<div className={Styles.ItemTitle}>{data.name}</div>
					{/*</div>*/}
				</NavLink>
			))}
			{isUserAdmin &&
				AdminMenuData.map(data => (
					<NavLink
						to={data.path}
						key={data.path}
						className={({ isActive }) =>
							`${Styles.MenuItem} ${darkmode && Styles.MenuItemDark} ${
								isActive &&
								(!darkmode ? Styles.MenuItemActive : Styles.MenuItemActiveDark)
							}`
						}
					>
						{/*<div>*/}
						{data.icon}
						<div className={Styles.ItemTitle}>{data.name}</div>
						{/*</div>*/}
					</NavLink>
				))}
		</nav>
	)
}

export default Menu