import { FC } from 'react'
import { useTheme } from '@/hooks/useTheme.hook'
import { BASE_API_URL } from '@/store/api/axios'
import Text from '../../styles/text.module.scss'
import Button from '../generic/buttons/primary-button/button'
import MaterialInterface from './material.interface'
import Styles from './material.module.scss'


const Material: FC<MaterialInterface> = material => {
	const { darkmode } = useTheme()

	return (
		<div className={`${Styles.Material} ${darkmode && Styles.MaterialDark}`}>
			<div className={Styles.MaterialInfo}>
				<span className={`${Text.Caption1Regular} ${Styles.MaterialFormat}`}>
					{material.format}
				</span>
				<h6 className={Text.H6Bold}>{material.name}</h6>
				<p className={`${Text.Body2Regular} ${Styles.MaterialDescription}`}>
					{material.description}
				</p>
			</div>
			<a
				className={Styles.MaterialLink}
				href={`${BASE_API_URL}${material.link}`}
				target={'_blank'}
			>
				<Button
					clickFunction={() => {}}
					text={'Download'}
					stroke={true}
					small={true}
				/>
			</a>
		</div>
	)
}

export default Material