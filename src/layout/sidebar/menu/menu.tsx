import { FC, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeContext } from '@/context/theme.context'
import { useGetAuthRole } from '@/hooks/useGetAuthRole.hook'
import { AdminMenuData, MenuData } from './menu.data'
import Styles from './menu.module.scss'


const Menu: FC = () => {
	const { darkmode } = useContext(ThemeContext)

	const { userRole, isLoading } = useGetAuthRole()
	const isUserAdmin = userRole?.type === 'administrator'

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
				!isLoading &&
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