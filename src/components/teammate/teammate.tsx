import { FC } from 'react'
import { useTheme } from '@/hooks/useTheme.hook'
import Text from '../../styles/text.module.scss'
import Avatar from '../avatar/avatar'
import TeammateInterface from './teammate.interface'
import Styles from './teammate.module.scss'


const Teammate: FC<TeammateInterface> = employee => {
	const { darkmode } = useTheme()

	return (
		<div className={`${Styles.Teammate} ${darkmode && Styles.TeammateDark}`}>
			<Avatar
				avatarPath={employee.avatarPath}
				alt={employee.name}
				width={'100%'}
				height={'134px'}
			/>
			<div className={Styles.TeammateInfo}>
				<h6 className={`${Text.Caption1Medium} ${Styles.TeammateName}`}>
					{employee.name} {employee.surname[0]}.
				</h6>
				<h6 className={`${Text.Caption2Regular} ${Styles.TeammateJob}`}>
					{employee.jobTitle}
				</h6>
			</div>
		</div>
	)
}

export default Teammate