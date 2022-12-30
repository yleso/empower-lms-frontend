import { FC } from 'react'
import Divider from '@/components/generic/divider/divider'
import SidebarButton from '@/components/sidebar-button/sidebar-button'
import LogoMedium from '@/assets/img/logo/emblem-logo.png'
import DarkLogoLarge from '@/assets/img/logo/right-text-logo-dark.png'
import LightLogoLarge from '@/assets/img/logo/right-text-logo-light.png'
import { useAuth } from '@/hooks/useAuth.hook'
import { useTheme } from '@/hooks/useTheme.hook'
import Vars from '@/vars/vars.json'
import Menu from './menu/menu'
import Styles from './sidebar.module.scss'


const Sidebar: FC = () => {
	const { darkmode, isSidebarOpened } = useTheme()
	const { user } = useAuth()
	const userAccessLevel = user?.access_level || 1

	return (
		<>
			{isSidebarOpened && (
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
					{userAccessLevel >= 2 && <SidebarButton />}
				</aside>
			)}
		</>
	)
}

export default Sidebar