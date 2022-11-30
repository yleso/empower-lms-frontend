import { FC, useContext } from 'react'
import Divider from '@/components/generic/divider/divider'
import SidebarButton from '@/components/sidebar-button/sidebar-button'
import { ThemeContext } from '@/context/theme.context'
import LogoMedium from '@/assets/img/logo/emblem-logo.png'
import DarkLogoLarge from '@/assets/img/logo/right-text-logo-dark.png'
import LightLogoLarge from '@/assets/img/logo/right-text-logo-light.png'
import Vars from '@/vars/vars.json'
import Menu from './menu/menu'
import Styles from './sidebar.module.scss'


const Sidebar: FC = () => {
	const { sidebarIsOpen, darkmode } = useContext(ThemeContext)

	return (
		<>
			{sidebarIsOpen && (
				<aside
					className={`${Styles.Sidebar} ${darkmode && Styles.SidebarDark}`}
				>
					<div className={Styles.LargeLogo}>
						{!darkmode ? (
							<img src={DarkLogoLarge} alt={`${Vars['company']} logo`} />
						) : (
							<img src={LightLogoLarge} alt={`${Vars['company']} logo`} />
						)}
					</div>
					<div className={Styles.MediumLogo}>
						<img src={LogoMedium} alt={'Skoda logo'} width={48} height={48} />
					</div>
					<Divider />
					<Menu />
					<Divider />
					<SidebarButton />
				</aside>
			)}
		</>
	)
}

export default Sidebar