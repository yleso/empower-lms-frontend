import { FC, useContext } from 'react'
import { ThemeContext } from '@/context/theme.context'
import { BASE_API_URL } from '@/store/api/axios'
import Text from '@/styles/text.module.scss'
import Button from '../generic/buttons/primary-button/button'
import CourseInterface from './course.interface'
import Styles from './course.module.scss'


const Course: FC<CourseInterface> = ({
	id,
	icons,
	name,
	description,
	disabled
}) => {
	const { darkmode } = useContext(ThemeContext)

	return (
		<div className={`${Styles.Course} ${darkmode && Styles.CourseDark}`}>
			<div className={Styles.CourseContent}>
				<div className={Styles.CourseIcons}>
					{icons &&
						icons.map(icon => (
							<img
								key={icon.id}
								src={`${BASE_API_URL}${icon.attributes.url}`}
								alt={icon.attributes.name}
							/>
						))}
				</div>
				<h6 className={`${Styles.CourseTitle} ${Text.H6Bold}`}>{name}</h6>
				<p className={`${Styles.CourseDescription} ${Text.Body2Regular}`}>
					{description}
				</p>
			</div>
			<div className={Styles.CourseButton}>
				<Button
					clickFunction={() => {}}
					text={'Assign a course'}
					disabled={disabled}
					stroke
					small
				/>
			</div>
		</div>
	)
}

export default Course