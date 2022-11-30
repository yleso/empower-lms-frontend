import { FC } from 'react'
import Text from '@/styles/text.module.scss'
import ButtonInterface from './button.interface'
import Styles from './button.module.scss'


const Button: FC<ButtonInterface> = ({
	fill,
	stroke,
	large,
	small,
	text,
	submit,
	disabled,
	clickFunction
}) => {
	const getTypeClass = () => {
		if (stroke) {
			return Styles.ButtonStroke
		}

		if (fill) {
			return Styles.ButtonFill
		}
	}

	const getSizeClass = () => {
		if (large) {
			return `${Styles.ButtonLarge} ${Text.ButtonLarge}`
		}

		if (small) {
			return `${Styles.ButtonSmall} ${Text.ButtonSmall}`
		}
	}

	const classes = `${Styles.Button} ${getTypeClass()} ${getSizeClass()} ${
		disabled && Styles.ButtonDisabled
	}`

	return (
		<button
			type={submit ? 'submit' : 'button'}
			className={classes}
			onClick={clickFunction}
			disabled={disabled}
		>
			{text}
		</button>
	)
}

export default Button