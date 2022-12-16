import React, { FC } from 'react'
import { SelectInterface } from '@/generic/select/select.interface'
import Styles from './select.module.scss'

const Select: FC<SelectInterface> = ({
	theme,
	options,
	value,
	reference,
	onChange,
	onBlur
}) => {
	return (
		<div
			className={`${Styles.Select} ${
				theme === 'grey'
					? Styles.SelectGrey
					: theme === 'darkGrey'
					? Styles.SelectDarkGrey
					: theme === 'black'
					? Styles.SelectBlack
					: Styles.SelectWhite
			}`}
		>
			{/*@ts-ignore*/}
			<select value={value} ref={reference} onChange={onChange} onBlur={onBlur}>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.text}
					</option>
				))}
			</select>
		</div>
	)
}

export default Select