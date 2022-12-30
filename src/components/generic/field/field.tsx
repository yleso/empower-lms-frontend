import React, { FC } from 'react'
import { Lock } from 'tabler-icons-react'
import Text from '@/styles/text.module.scss'
import { FieldInterface } from './field.interface'
import Styles from './field.module.scss'


const Field: FC<FieldInterface> = ({
	name,
	reference,
	onChange,
	onBlur,
	value,
	required,
	disabled,
	type,
	theme
}) => {
	return (
		<>
			<div
				className={`${Styles.Field} ${
					theme === 'grey'
						? Styles.FieldGrey
						: theme === 'darkGrey'
						? Styles.FieldDarkGrey
						: theme === 'black'
						? Styles.FieldBlack
						: Styles.FieldWhite
				}`}
			>
				<>
					{type === 'textarea' ? (
						<textarea
							className={`${Text.Caption1Medium} ${Styles.Textarea}`}
							name={name}
							required={required}
							disabled={disabled}
							value={value}
							ref={reference}
							onChange={onChange}
							onBlur={onBlur}
							rows={4}
						/>
					) : (
						<input
							className={`${Text.Caption1Medium}`}
							name={name}
							type={type}
							required={required}
							disabled={disabled}
							value={value}
							ref={reference}
							onChange={onChange}
							onBlur={onBlur}
						/>
					)}
				</>
				{disabled && (
					<div>
						<Lock size={16} />
					</div>
				)}
			</div>
		</>
	)
}

export default Field