import { FC, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import AssignedCourse from '@/components/assigned-course/assigned-course'
import Switcher from '@/components/generic/switcher/switcher'
import Title from '@/components/generic/title/title'
import { coursesData } from '../../data/courses.data'
import Styles from './my-learning.module.scss'


const MylearningPage: FC = () => {
	const [isDone, setIsDone] = useState(false)

	const assigned = coursesData.filter(course => course.totalProgress !== 100)
	const done = coursesData.filter(course => course.totalProgress === 100)
	const courseList = !done ? assigned : done

	return (
		<section>
			<div className={Styles.Header}>
				<Title text={'My learning'} />
				<Switcher state={isDone} toggle={setIsDone} />
			</div>
			<div className={Styles.CoursesGrid}>
				{courseList.map(course => (
					<AssignedCourse
						key={course.id}
						id={course.id}
						icons={course.icons}
						name={course.name}
						description={course.description}
						totalProgress={course.totalProgress}
						modules={course.modules}
						lessons={course.lessons}
						tests={course.tests}
					/>
				))}
			</div>
		</section>
	)
}

export default MylearningPage