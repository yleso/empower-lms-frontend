import { ThemeContext } from '@/context/theme.context'
import { FC, useContext } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { Link } from 'react-router-dom'
import Text from '../../styles/text.module.scss'
import Vars from '../../vars/vars.json'
import AssignedCourseInterface from './assigned-course.interface'
import Styles from './assigned-course.module.scss'

const AssignedCourse: FC<AssignedCourseInterface> = course => {
	const { darkmode } = useContext(ThemeContext)

	const progress: number =
		course.totalProgress > 99 && course.totalProgress !== 100
			? 99
			: Math.round(course.totalProgress)
	const rotation: number = 1 - course.totalProgress / 100

	return (
		<>
			<Link to={'/my-learning/course/1/'}>
				<div className={`${Styles.Course} ${darkmode && Styles.CourseDark}`}>
					<div className={Styles.CourseContent}>
						<div className={Styles.CourseInfo}>
							<div className={Styles.CourseIcons}>
								{course.icons.map((icon, index) => (
									<div key={index}>{icon}</div>
								))}
							</div>
							<h3 className={`${Text.TitleBold} ${Styles.CourseName}`}>
								{course.name}
							</h3>
							<p className={`${Styles.CourseDescription} ${Text.Body1Regular}`}>
								{course.description}
							</p>
						</div>
						<div className={Styles.CourseResults}>
							<div className={`${Styles.CourseResult} ${Text.H6Regular}`}>
								<span className={`${Styles.ResultGot} ${Text.H6Bold}`}>
									{course.modules.got}
								</span>
								<span className={Styles.ResultTotal}>
									/{course.modules.total}
								</span>
								<span className={Styles.ResultName}>&nbsp;Modules</span>
							</div>
							<div className={`${Styles.CourseResult} ${Text.H6Regular}`}>
								<span className={`${Styles.ResultGot} ${Text.H6Bold}`}>
									{course.lessons.got}
								</span>
								<span className={Styles.ResultTotal}>
									/{course.lessons.total}
								</span>
								<span className={Styles.ResultName}>&nbsp;Lessons</span>
							</div>
							<div className={`${Styles.CourseResult} ${Text.H6Regular}`}>
								<span className={`${Styles.ResultGot} ${Text.H6Bold}`}>
									{course.tests.got}
								</span>
								<span className={Styles.ResultTotal}>
									/{course.tests.total}
								</span>
								<span className={Styles.ResultName}>&nbsp;Tests</span>
							</div>
						</div>
					</div>
					<div className={Styles.CourseProgress}>
						<CircularProgressbar
							value={course.totalProgress}
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
						{/*	react-circular-progressbar*/}
					</div>
				</div>
			</Link>
		</>
	)
}

export default AssignedCourse
