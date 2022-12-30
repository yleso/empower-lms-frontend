import { FC, useEffect, useState } from 'react'
import { useTheme } from '@/hooks/useTheme.hook'
import { BASE_API_URL } from '@/store/api/axios'
import courseApi from '@/store/api/course.api'
import Text from '@/styles/text.module.scss'
import Button from '../generic/buttons/primary-button/button'
import { CourseInterface } from './course.interface'
import Styles from './course.module.scss'


const Course: FC<CourseInterface> = ({
	id,
	icons,
	name,
	description,
	disabled
}) => {
	//Hooks
	const { darkmode } = useTheme()
	const [isDisabled, setIsDisabled] = useState<boolean>(false)
	//Set disabled mode on it change
	useEffect(() => {
		setIsDisabled(disabled)
	}, [disabled])

	//Api functions
	const [assignCourse] = courseApi.useAssignCourseMutation()

	return (
		<div className={`${Styles.Course} ${darkmode && Styles.CourseDark}`}>
			<div className={Styles.CourseContent}>
				<div className={Styles.CourseIcons}>
					{icons &&
						icons.map(icon => (
							<img key={icon} src={`${BASE_API_URL}${icon}`} alt={icon} />
						))}
				</div>
				<h6 className={`${Styles.CourseTitle} ${Text.H6Bold}`}>{name}</h6>
				<p className={`${Styles.CourseDescription} ${Text.Body2Regular}`}>
					{description}
				</p>
			</div>
			<div className={Styles.CourseButton}>
				<Button
					clickFunction={() => assignCourse(id)}
					text={'Assign a course'}
					disabled={isDisabled}
					stroke
					small
				/>
			</div>
		</div>
	)
}

export default Course