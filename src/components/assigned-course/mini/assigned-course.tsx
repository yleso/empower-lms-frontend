import { FC } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { useTheme } from '@/hooks/useTheme.hook'
import Text from '@/styles/text.module.scss'
import Vars from '@/vars/vars.json'
import { AssignedCourseInterface } from './assigned-course.interface'
import Styles from './assigned-course.module.scss'


const AssignedCourseMini: FC<AssignedCourseInterface> = course => {
	const { darkmode } = useTheme()

	const progress: number = Math.round(course.progress)

	const rotation: number = 1 - course.progress / 100

	const startedOn = String(course.startedOn).substring(0, 10)

	return (
		<div className={`${Styles.Course} ${darkmode && Styles.CourseDark}`}>
			<div className={Styles.CourseInfo}>
				<h6 className={Text.H6Bold}>{course.name}</h6>
				<p className={Text.Caption1Regular}>Started on&nbsp;{startedOn}</p>
			</div>

			<div className={Styles.CourseProgress}>
				<CircularProgressbar
					value={course.progress}
					text={`${progress}%`}
					strokeWidth={7}
					styles={{
						path: {
							// Path color
							stroke: `${Vars['brand-main-color']}`,
							// Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
							strokeLinecap: 'butt',
							// Rotate the path
							transform: `rotate(${rotation}turn)`,
							transformOrigin: 'center center'
						},
						// Customize the circle behind the path, i.e. the "total progress"
						trail: {
							// Trail color
							stroke: `${Vars['grey-secondary-light-color']}`,
							// Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
							strokeLinecap: 'butt'
						},
						// Customize the text
						text: {
							// Text color
							fill: `${Vars['brand-main-color']}`,
							// Text
							fontWeight: 'bold',
							fontSize: '24px',
							lineHeight: '0'
						}
					}}
				/>
			</div>
		</div>
	)
}

export default AssignedCourseMini