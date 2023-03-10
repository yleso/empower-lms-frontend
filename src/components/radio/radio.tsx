import { FC } from 'react'
import { useTheme } from '@/hooks/useTheme.hook'
import Text from '@/styles/text.module.scss'
import { RadioInterface } from './radio.interface'
import Styles from './radio.module.scss'


const Radio: FC<RadioInterface> = ({
	name,
	text,
	value,
	reference,
	onChange,
	onBlur
}) => {
	const { darkmode } = useTheme()

	return (
		<label
			className={`${Styles.RadioWrapper} ${
				darkmode && Styles.RadioWrapperDark
			}`}
		>
			<input
				type={'radio'}
				className={Styles.Input}
				name={name}
				value={value}
				ref={reference}
				onChange={onChange}
				onBlur={onBlur}
			/>
			<div className={Styles.RadioCircle}>
				<div />
			</div>
			<p className={Text.Body1Regular}>{text}</p>
		</label>
	)
}

export default Radio