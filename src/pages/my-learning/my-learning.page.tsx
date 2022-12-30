import { FC, useCallback, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { Link } from 'react-router-dom'
import AssignedCourse from '@/components/assigned-course/assigned-course'
import Switcher from '@/components/generic/switcher/switcher'
import Title from '@/components/generic/title/title'
import Loader from '@/components/loader/loader'
import { useAuth } from '@/hooks/useAuth.hook'
import { calculateProgress } from '@/utils/calculate-progress.util'
import employeeApi from '@/store/api/employee.api'
import Styles from './my-learning.module.scss'


const MylearningPage: FC = () => {
	//Hooks
	const [isDone, setIsDone] = useState(false)
	const { user } = useAuth()
	const userId = user?.id || 0
	const { data: learnings, isLoading } =
		employeeApi.useGetEmployeeLearningsQuery(userId)

	const getTotal = useCallback(
		(progressId: number, lessons: boolean) => {
			//@ts-ignore
			const currentLearning = learnings.filter(
				progress => progress.id === progressId
			)[0]

			let total = 0

			for (const module of currentLearning.course.modules) {
				if (lessons) {
					total += module.lessons.length
				} else {
					total += module.tests.length
				}
			}

			return total
		},
		[learnings]
	)

	const formattedProgresses = () => {
		let formattedProgresses = []

		if (learnings) {
			for (const learning of learnings) {
				const formattedProgress = {
					id: learning.id,
					courseId: learning.course.id,
					icons: learning.course.icons_urls,
					name: learning.course.name,
					description: learning.course.description,
					totalProgress: calculateProgress(
						getTotal(learning.id, true),
						learning.passed_lessons.length,
						getTotal(learning.id, false),
						learning.passed_tests.length
					),
					modules: {
						total: learning.course.modules.length,
						got: learning.passed_modules.length
					},
					lessons: {
						total: getTotal(learning.id, true),
						got: learning.passed_lessons.length
					},
					tests: {
						total: getTotal(learning.id, false),
						got: learning.passed_tests.length
					}
				}

				formattedProgresses.push(formattedProgress)
			}
		}

		return formattedProgresses
	}

	const assigned = formattedProgresses().filter(
		progress => progress.totalProgress !== 100
	)

	const done = formattedProgresses().filter(
		progress => progress.totalProgress === 100
	)

	const courseList = !isDone ? assigned : done

	if (isLoading) return <Loader />

	return (
		<section>
			<div className={Styles.Header}>
				<Title text={'My learning'} />
				<Switcher state={isDone} toggle={setIsDone} />
			</div>
			<div className={Styles.CoursesGrid}>
				{learnings &&
					courseList.map(progress => (
						<Link
							key={progress.id}
							to={`/my-learning/course/${progress.courseId}`}
						>
							<AssignedCourse
								id={progress.id}
								icons={progress.icons}
								name={progress.name}
								description={progress.description}
								totalProgress={progress.totalProgress}
								modules={progress.modules}
								lessons={progress.lessons}
								tests={progress.tests}
							/>
						</Link>
					))}
			</div>
		</section>
	)
}

export default MylearningPage