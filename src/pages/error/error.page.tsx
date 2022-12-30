import { FC } from 'react'
import Button from '@/components/generic/buttons/primary-button/button'
import { useTheme } from '@/hooks/useTheme.hook'
import Text from '@/styles/text.module.scss'
import { ErrorInterface } from './error.interface'
import Styles from './error.module.scss'


const ErrorPage: FC<ErrorInterface> = ({ error }) => {
	const { darkmode } = useTheme()

	return (
		<div className={`${darkmode && Styles.ErrorPageDark} ${Styles.ErrorPage}`}>
			<h2 className={Text.H1Bold}>{error}</h2>
			<div className={Styles.Text}>
				<p className={`${Text.H4Regular}`}>
					{error === 404 && 'Page, which you are looking for does not exist!'}
					{error === 403 &&
						'You do not have enough permission to view this page'}
					{error === 501 && 'This Learning Management System is not activated'}
				</p>
				<p className={`${Styles.SmallText} ${Text.H5Regular}`}>
					{error === 404 &&
						'Or maybe something just went wrong... Anyway you should go back'}
					{error === 404 &&
						'You access level is not great enough to get access'}
					{error === 501 &&
						'Administrators of the platform did not activate the platform or it is deactivated'}
				</p>
			</div>
			{error !== 501 && (
				<Button
					clickFunction={() => history.back()}
					text={'Go back'}
					fill
					large
				/>
			)}
		</div>
	)
}

export default ErrorPage