import { ThemeContext } from '@/context/theme.context'
import { FC, useContext } from 'react'
import Button from '@/components/generic/buttons/primary-button/button'
import Text from '@/styles/text.module.scss'
import Styles from './404.module.scss'


const Page404: FC = () => {
	const { darkmode } = useContext(ThemeContext)

	return (
		<div className={`${darkmode && Styles.Page404Dark} ${Styles.Page404}`}>
			<h2 className={Text.H1Bold}>404</h2>
			<div className={Styles.Text}>
				<p className={`${Text.H4Regular}`}>
					Page, which you are looking for does not exist!
				</p>
				<p className={`${Styles.SmallText} ${Text.H5Regular}`}>
					Or maybe something just went wrong... Anyway you should go back
				</p>
			</div>
			<Button
				clickFunction={() => history.back()}
				text={'Go back'}
				fill
				large
			/>
		</div>
	)
}

export default Page404