import { useQuery } from '@apollo/client';
import { FC, useCallback, useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import { learningsQuery, progressInterface } from '@/pages/my-learning/learnings.query';
import AssignedCourse from '@/components/assigned-course/assigned-course';
import Switcher from '@/components/generic/switcher/switcher';
import Title from '@/components/generic/title/title';
import Loader from '@/components/loader/loader';
import { useAuth } from '@/hooks/useAuth.hook'
import { calculateProgress } from '@/utils/calculate-progress.util';
import Styles from './my-learning.module.scss';


const MylearningPage: FC = () => {
	//Hooks
	const [isDone, setIsDone] = useState(false)
	const { user } = useAuth()
	const userId = user?.id || 0
	const { loading, data, refetch } = useQuery(learningsQuery(userId))

	const [progresses, setProgresses] = useState<progressInterface[]>(
		data?.userProgresses.data
	)

	useEffect(() => {
		refetch().then()
	}, [])

	useEffect(() => {
		setProgresses(data?.userProgresses.data)
	}, [loading])

	const getIcons = useCallback(
		(progressId: number) => {
			const currentProgress = progresses.filter(
				progress => progress.id === progressId
			)[0]

			let icons = []

			for (const icon of currentProgress.attributes.course.data.attributes.icons
				.data) {
				icons.push({
					name: icon.attributes.name,
					url: icon.attributes.url
				})
			}

			return icons
		},
		[progresses]
	)

	const getTotal = useCallback(
		(progressId: number, lessons: boolean) => {
			const currentProgress = progresses.filter(
				progress => progress.id === progressId
			)[0]

			let total = 0

			for (const module of currentProgress.attributes.course.data.attributes
				.modules.data) {
				const attributes = module.attributes

				if (lessons) {
					total += attributes.lessons.data.length
				} else {
					total += attributes.tests.data.length
				}
			}

			return total
		},
		[progresses]
	)

	const formattedProgresses = () => {
		let formattedProgresses = []

		if (progresses) {
			for (const progress of progresses) {
				const formattedProgress = {
					id: progress.id,
					courseId: progress.attributes.course.data.id,
					icons: getIcons(progress.id),
					name: progress.attributes.course.data.attributes.name,
					description: progress.attributes.course.data.attributes.name,
					totalProgress: calculateProgress(
						getTotal(progress.id, true),
						progress.attributes.lessons.data.length,
						getTotal(progress.id, false),
						progress.attributes.tests.data.length
					),
					modules: {
						total:
							progress.attributes.course.data.attributes.modules.data.length,
						got: progress.attributes.modules.data.length
					},
					lessons: {
						total: getTotal(progress.id, true),
						got: progress.attributes.lessons.data.length
					},
					tests: {
						total: getTotal(progress.id, false),
						got: progress.attributes.tests.data.length
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

	if (loading) return <Loader />

	return (
		<section>
			<div className={Styles.Header}>
				<Title text={'My learning'} />
				<Switcher state={isDone} toggle={setIsDone} />
			</div>
			<div className={Styles.CoursesGrid}>
				{progresses &&
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