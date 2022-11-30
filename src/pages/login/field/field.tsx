import { ThemeContext } from '@/context/theme.context'
import { FC, forwardRef, useContext } from 'react'
import Text from '../../../styles/text.module.scss'
import Styles from '../login.module.scss'
import FieldInterface from './field.interface'

const Field: FC = forwardRef<HTMLInputElement, FieldInterface>(
	({ error, type = 'text', style, ...rest }) => {
		const { darkmode } = useContext(ThemeContext)

		return (
			<div className={Styles.FormInput}>
				<label className={Text.H6Bold}>
					{type === 'login' ? 'Password' : 'Confirm Password'}
				</label>
				<input
					type={type}
					required
					className={`${Text.Caption1Medium} ${
						darkmode && Styles.InputDarkGrey
					}`}
					name={type === 'login' ? 'password' : 'passwordConfirmation'}
					{...rest}
				/>
				<div></div>
			</div>
		)
	}
)

export default Field
