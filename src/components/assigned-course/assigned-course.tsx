import { FC, useContext } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { ThemeContext } from '@/context/theme.context'
import Text from '@/styles/text.module.scss'
import Vars from '@/vars/vars.json'
import { AssignedCourseInterface } from './assigned-course.interface'
import Styles from './assigned-course.module.scss'


const AssignedCourse: FC<AssignedCourseInterface> = ({
	id,
	name,
	description,
	icons,
	modules,
	lessons,
	tests,
	totalProgress
}) => {
	const { darkmode } = useContext(ThemeContext)

	const progress: number =
		totalProgress > 99 && totalProgress !== 100 ? 99 : Math.round(totalProgress)
	const rotation: number = 1 - totalProgress / 100

	return (
		<div className={`${Styles.Course} ${darkmode && Styles.CourseDark}`}>
			<div className={Styles.CourseContent}>
				<div className={Styles.CourseInfo}>
					<div className={Styles.CourseIcons}>
						{icons.map(icon => (
							<img
								key={icon.url}
								src={`${import.meta.env.VITE_API_URL}${icon.url}`}
								alt={icon.name}
							/>
						))}
					</div>
					<h3 className={`${Text.TitleBold} ${Styles.CourseName}`}>{name}</h3>
					<p className={`${Styles.CourseDescription} ${Text.Body1Regular}`}>
						{description}
					</p>
				</div>
				<div className={Styles.CourseResults}>
					{/*<div className={`${Styles.CourseResult} ${Text.H6Regular}`}>*/}
					{/*	<span className={`${Styles.ResultGot} ${Text.H6Bold}`}>*/}
					{/*		{modules.got}*/}
					{/*	</span>*/}
					{/*	<span className={Styles.ResultTotal}>/{modules.total}</span>*/}
					{/*	<span className={Styles.ResultName}>&nbsp;Modules</span>*/}
					{/*</div>*/}
					<div className={`${Styles.CourseResult} ${Text.H6Regular}`}>
						<span className={`${Styles.ResultGot} ${Text.H6Bold}`}>
							{lessons.got}
						</span>
						<span className={Styles.ResultTotal}>/{lessons.total}</span>
						<span className={Styles.ResultName}>&nbsp;Lessons</span>
					</div>
					<div className={`${Styles.CourseResult} ${Text.H6Regular}`}>
						<span className={`${Styles.ResultGot} ${Text.H6Bold}`}>
							{tests.got}
						</span>
						<span className={Styles.ResultTotal}>/{tests.total}</span>
						<span className={Styles.ResultName}>&nbsp;Tests</span>
					</div>
				</div>
			</div>
			<div className={Styles.CourseProgress}>
				<CircularProgressbar
					value={totalProgress}
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
	)
}

export default AssignedCourse