import React, { FC } from 'react'
import { Lock } from 'tabler-icons-react'
import Text from '@/styles/text.module.scss'
import { FieldInterface } from './field.interface'
import Styles from './field.module.scss'


const Field: FC<FieldInterface> = field => {
	return (
		<>
			<div
				className={`${Styles.Field} ${
					field.theme === 'grey'
						? Styles.FieldGrey
						: field.theme === 'darkGrey'
						? Styles.FieldDarkGrey
						: field.theme === 'black'
						? Styles.FieldBlack
						: Styles.FieldWhite
				}`}
			>
				<>
					{field.type === 'textarea' ? (
						<textarea
							className={`${Text.Caption1Medium} ${Styles.Textarea}`}
							name={field.name}
							required={field?.required}
							disabled={field?.disabled}
							value={field?.value}
							ref={field?.reference}
							onChange={field?.onChange}
							onBlur={field?.onBlur}
							rows={4}
						/>
					) : (
						<input
							className={`${Text.Caption1Medium}`}
							name={field.name}
							type={field?.type}
							required={field?.required}
							disabled={field?.disabled}
							value={field?.value}
							ref={field?.reference}
							onChange={field?.onChange}
							onBlur={field?.onBlur}
						/>
					)}
				</>
				{field.disabled && (
					<div>
						<Lock size={16} />
					</div>
				)}
			</div>
		</>
	)
}

export default Field