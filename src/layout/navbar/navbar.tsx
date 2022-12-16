import { FC, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Moon, SunHigh } from 'tabler-icons-react'
import Avatar from '@/components/avatar/avatar'
import NavbarSearch from '@/components/navbar-search/navbar-search'
import { ThemeContext } from '@/context/theme.context'
import LogOut from '@/assets/icons/log-out.svg'
import { useActions } from '@/hooks/useActions.hook'
import { useAuth } from '@/hooks/useAuth.hook'
import employeeApi from '@/store/api/employee.api'
import Text from '@/styles/text.module.scss'
import Styles from './navbar.module.scss'


const Navbar: FC = () => {
	const { toggleSidebar, darkmode, toggleDarkmode } = useContext(ThemeContext)
	const { user } = useAuth()
	const { logout } = useActions()
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	// Data fetch
	const { data: userData } = employeeApi.useGetEmployeeQuery(user?.id || 0)
	// End of fetching data

	return (
		<header className={`${Styles.Navbar} ${darkmode && Styles.NavbarDark}`}>
			<div className={Styles.LeftSide}>
				<button
					type='button'
					onClick={() => toggleSidebar()}
					className={Styles.NavbarBurger}
				>
					<span />
					<span />
					<span />
				</button>
				<NavbarSearch />
			</div>
			<div className={Styles.RightSide}>
				<div className={Styles.Icons}>
					<button type='button' onClick={() => toggleDarkmode()}>
						{!darkmode ? (
							<SunHigh size={16} color={'#FFBF42'} />
						) : (
							<Moon size={16} color={'#2B74B9'} />
						)}
					</button>
				</div>
				<div className={Styles.Profile}>
					<Link to={'profile'}>
						<div className={Styles.ProfileAvatar}>
							<Avatar
								alt={userData?.name}
								width={'32px'}
								height={'32px'}
								avatarPath={
									userData?.avatar
										? `${import.meta.env.VITE_API_URL}${
												userData.avatar.formats.thumbnail.url
										  }`
										: 'https://via.placeholder.com/32'
								}
							/>
						</div>
					</Link>
					<Link to={'/profile'}>
						<p
							className={Text.Body2Regular}
							// onClick={() => {
							// 	setIsShow(!isShow)
							// }}
						>
							<span className={Styles.Bold}>Hi, </span>
							{user?.name}
						</p>
					</Link>
					{/*<button*/}
					{/*	ref={ref}*/}
					{/*	className={*/}
					{/*		!isShow ? Styles.ProfileButton : Styles.ProfileButtonRotate*/}
					{/*	}*/}
					{/*	onClick={() => {*/}
					{/*		setIsShow(!isShow)*/}
					{/*	}}*/}
					{/*	type={'button'}*/}
					{/*>*/}
					{/*	<ChevronDown />*/}
					{/*</button>*/}

					<button onClick={() => handleLogout()}>
						<img src={LogOut} width={16} height={14.4} alt={'Logout'} />
					</button>

					{/*Dialog window*/}
					{/*<dialog*/}
					{/*	ref={ref}*/}
					{/*	className={`${Styles.ProfileDialog} ${*/}
					{/*		darkmode && Styles.ProfileDialogDark*/}
					{/*	} ${!isShow && Styles.ProfileDialogClosed}`}*/}
					{/*>*/}
					{/*	<Link className={Text.Body2Medium} to={'profile'}>*/}
					{/*		Open profile*/}
					{/*	</Link>*/}
					{/*	<Link to={'login'} className={`${Styles.DialogLogout}`}>*/}
					{/*		<span className={Text.Body2Medium}>Log out</span>*/}
					{/*		<ArrowBigRight size={16} color={Vars['brand-main-color']} />*/}
					{/*	</Link>*/}
					{/*</dialog>*/}
				</div>
			</div>
		</header>
	)
}

export default Navbar