import React, { FC, useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Page404 from '@/pages/404/404.page'
import Faq from '@/components/FAQ/FAQ'
import Course from '@/components/course/course'
import { AddButton } from '@/components/generic/buttons/admin-buttons/big-buttons/admin-button'
import EditButton from '@/components/generic/buttons/admin-buttons/edit-buton/edit-button'
import Title from '@/components/generic/title/title'
import Loader from '@/components/loader/loader'
import Material from '@/components/material/material'
import CoursePopup from '@/components/team-popups/course-popup/course-popup'
import FaqPopup from '@/components/team-popups/faq-popup/faq-popup'
import MaterialPopup from '@/components/team-popups/material-popup/material-popup'
import TeammatePopup from '@/components/team-popups/teammate-popup/teammate-popup'
import WordPopup from '@/components/team-popups/word-popup/word-popup'
import Teammate from '@/components/teammate/teammate'
import { ThemeContext } from '@/context/theme.context'
import useAuth from '@/hooks/useAuth.hook'
import { useGetAuthRole } from '@/hooks/useGetAuthRole.hook'
import useOutside from '@/hooks/useOutside.hook'
import {
	FilterWords,
	glossaryFilters,
	materialsFilters
} from '@/utils/glossary-filtering.util'
import { BASE_API_URL } from '@/store/api/axios'
import courseApi from '@/store/api/course.api'
import employeeApi from '@/store/api/employee.api'
import materialApi from '@/store/api/material.api'
import teamApi from '@/store/api/team.api'
import Text from '@/styles/text.module.scss'
import Styles from './team.module.scss'


const TeamPage: FC = () => {
	const { darkmode } = useContext(ThemeContext)
	const { team_id } = useParams()
	const teamId = Number(team_id) || 0

	//Hooks
	//Ui hooks
	const [activeFilter, setActiveFilter] = useState(glossaryFilters[0])
	const [materialFilter, setMaterialFilter] = useState(materialsFilters[0])
	//Hook to work with api
	const navigate = useNavigate()

	//Popups
	const {
		isShow: courseShow,
		setIsShow: setCourseShow,
		ref: courseRef
	} = useOutside(false)
	const {
		isShow: teammateShow,
		setIsShow: setTeammateShow,
		ref: teammateRef
	} = useOutside(false)
	const {
		isShow: materialShow,
		setIsShow: setMaterialShow,
		ref: materialRef
	} = useOutside(false)
	const {
		isShow: wordShow,
		setIsShow: setWordShow,
		ref: wordRef
	} = useOutside(false)
	const {
		isShow: faqShow,
		setIsShow: setFaqShow,
		ref: faqRef
	} = useOutside(false)

	//Data fetching
	const { userRole } = useGetAuthRole()

	//Team data
	const { data: teamData, isLoading: teamLoading } =
		teamApi.useGetTeamQuery(teamId)
	const { data: teamEmployeesData } = employeeApi.useGetTeamMembersQuery(teamId)
	const { data: coursesData } = courseApi.useGetTeamCoursesQuery(teamId)
	const { data: materialsData } = materialApi.useGetTeamMaterialsQuery(teamId)
	//End of data fetching

	//Data sorting

	//Team
	const team = teamData?.data

	//Courses
	const courses = coursesData?.data

	//Materials
	const materials = materialsData?.data

	//words
	const wordsData = team?.attributes.words
	const words = wordsData?.data

	//FAQs
	const faqsData = team?.attributes.faqs
	const faqs = faqsData?.data

	//End of data sorting

	//Filtering
	const filtredWords = FilterWords(words, activeFilter)

	//Controls
	const { user } = useAuth()
	const { data: userTeamData } = employeeApi.useGetEmployeeTeamQuery(
		user?.id || 0
	)
	const userTeamId = userTeamData?.data[0].id
	const isUserInTeam = String(teamId) === String(userTeamId)
	const userRoleType = userRole?.type || 'employee'
	const canUserEditAdmin =
		userRoleType === 'administrator' || userRoleType === 'manager'
	const canUserEdit = isUserInTeam || canUserEditAdmin

	if (teamLoading) return <Loader />
	if (!team) return <Page404 />

	return (
		<>
			{/*Popups*/}
			<CoursePopup
				popupShow={courseShow}
				setPopupShow={setCourseShow}
				popupRef={courseRef}
			/>
			<TeammatePopup
				popupShow={teammateShow}
				setPopupShow={setTeammateShow}
				popupRef={teammateRef}
				teamName={team.attributes.name}
			/>
			<MaterialPopup
				popupShow={materialShow}
				setPopupShow={setMaterialShow}
				popupRef={materialRef}
			/>
			<WordPopup
				popupShow={wordShow}
				setPopupShow={setWordShow}
				popupRef={wordRef}
			/>
			<FaqPopup
				popupShow={faqShow}
				setPopupShow={setFaqShow}
				popupRef={faqRef}
			/>
			{/*Popups*/}

			<section className={Styles.Section}>
				<div className={Styles.Header}>
					<div className={Styles.HeaderTitle}>
						<Title text={team?.attributes.name} />
						{isUserInTeam && <span className={Styles.MyTeam}>My team</span>}
					</div>
					{canUserEditAdmin && <AddButton action={() => setCourseShow(true)} />}
				</div>
				<div className={Styles.CoursesGrid}>
					{courses &&
						courses.map(course => (
							<div
								className={`${canUserEditAdmin && Styles.CursorPointer}`}
								key={course.id}
								onClick={
									!canUserEditAdmin
										? () => {}
										: () => navigate(`/knowledge-base/course/${course.id}`)
								}
							>
								<Course
									id={course.id}
									name={course.attributes.name}
									description={course.attributes.description}
									icons={course.attributes.icons.data}
									disabled={isUserInTeam}
								/>
							</div>
						))}
				</div>
			</section>

			<section className={Styles.Section}>
				<div className={Styles.Header}>
					<Title text={'Team'} />
					{canUserEditAdmin && (
						<div className={Styles.HeaderButtons}>
							<AddButton action={() => setTeammateShow(true)} />
						</div>
					)}
				</div>
				<div className={Styles.TeamGrid}>
					{teamEmployeesData &&
						teamEmployeesData.map(employee => (
							<Link to={`/employee/${employee.id}`} key={employee.id}>
								<Teammate
									avatarPath={
										employee.avatar
											? `${BASE_API_URL}${employee?.avatar?.formats.thumbnail.url}`
											: 'https://via.placeholder.com/128'
									}
									name={employee.name}
									surname={employee.surname}
									jobTitle={employee.job_title}
								/>
							</Link>
						))}
				</div>
			</section>

			<section className={Styles.Section}>
				<div className={`${Styles.Header} ${Styles.GlossaryHeader}`}>
					<Title text={'Materials'} />
					<ul className={Styles.GlossaryFilters}>
						{materialsFilters.map((filter, index) => (
							<li key={index}>
								<button
									className={`${Text.Caption1Regular} ${
										materialFilter === filter && Styles.GlossaryActiveFilter
									}`}
									onClick={() => setMaterialFilter(filter)}
								>
									{filter}
								</button>
							</li>
						))}
					</ul>
					{canUserEdit && (
						<div className={Styles.HeaderButtons}>
							<EditButton action={() => {}} />
							<AddButton action={() => setMaterialShow(true)} />
						</div>
					)}
				</div>
				<div className={Styles.MaterialsGrid}>
					{materials &&
						materials.map(material => (
							<Material
								key={material.id}
								format={material.attributes.format}
								name={material.attributes.name}
								description={material.attributes.description}
								link={material.attributes.file.data.attributes.url}
							/>
						))}
				</div>
			</section>

			<section className={Styles.Section}>
				<div className={`${Styles.Header} ${Styles.GlossaryHeader}`}>
					<Title text={'Glossary'} />
					<ul className={Styles.GlossaryFilters}>
						{glossaryFilters.map(filter => (
							<li key={filter}>
								<button
									className={`${Text.Caption1Regular} ${
										activeFilter === filter && Styles.GlossaryActiveFilter
									}`}
									onClick={() => setActiveFilter(filter)}
								>
									{filter}
								</button>
							</li>
						))}
					</ul>
					{canUserEdit && (
						<div className={Styles.HeaderButtons}>
							<EditButton action={() => {}} />
							<AddButton action={() => setWordShow(true)} />
						</div>
					)}
				</div>
				<ul className={Styles.GlossaryList}>
					{filtredWords &&
						filtredWords.map((word, index) => (
							<li
								key={index}
								className={`${Styles.GlossaryWord} ${
									darkmode && Styles.GlossaryWordDark
								}`}
							>
								<p className={Text.Body1Regular}>
									<span className={Text.H6Bold}>
										{word.attributes.name} -&nbsp;
									</span>
									{word.attributes.definition}
								</p>
							</li>
						))}
				</ul>
			</section>

			<section className={Styles.Section}>
				<div className={Styles.Header}>
					<Title text={'FAQ'} />
					{canUserEdit && (
						<div className={Styles.HeaderButtons}>
							<EditButton action={() => {}} />
							<AddButton action={() => setFaqShow(true)} />
						</div>
					)}
				</div>
				<div className={Styles.FAQGrid}>
					{faqs &&
						faqs.map((FAQ, index) => (
							<Faq
								key={index}
								question={FAQ.attributes.question}
								answer={FAQ.attributes.answer}
							/>
						))}
				</div>
			</section>
		</>
	)
}

export default TeamPage