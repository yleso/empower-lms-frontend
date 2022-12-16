import React, { FC, useContext, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Page404 from '@/pages/404/404.page'
import Faq from '@/components/FAQ/FAQ'
import Course from '@/components/course/course'
import {
	AddButton,
	EditButton as LargeEgitButton
} from '@/components/generic/buttons/admin-buttons/big-buttons/admin-button'
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
import Word from '@/components/word/word'
import { ThemeContext } from '@/context/theme.context'
import { useAuth } from '@/hooks/useAuth.hook'
import { useGetAuthRole } from '@/hooks/useGetAuthRole.hook'
import { useOutside } from '@/hooks/useOutside.hook'
import {
	FilterWords,
	glossaryFilters,
	materialsFilters
} from '@/utils/glossary-filtering.util'
import { BASE_API_URL } from '@/store/api/axios'
import courseApi from '@/store/api/course.api'
import employeeApi from '@/store/api/employee.api'
import faqApi from '@/store/api/faq.api'
import materialApi from '@/store/api/material.api'
import teamApi from '@/store/api/team.api'
import userProgressApi from '@/store/api/user-progress.api'
import wordApi from '@/store/api/word.api'
import Text from '@/styles/text.module.scss'
import Styles from './team.module.scss'


const TeamPage: FC = () => {
	//Hooks
	//Ui hooks
	const { darkmode } = useContext(ThemeContext)
	//Hooks to work with api
	const { team_id } = useParams()
	//Get team id
	const teamId = Number(team_id) || 0
	//User role
	const { userRole } = useGetAuthRole()
	//User
	const { user } = useAuth()
	//User id
	const userId = user?.id || 0

	//Hooks
	//Ui hooks
	const [activeFilter, setActiveFilter] = useState(glossaryFilters[0])
	const [materialFilter, setMaterialFilter] = useState(materialsFilters[0])
	//Edit states
	//Words
	const [wordEdit, setWordEdit] = useState(false)
	//Faq
	const [faqEdit, setFaqEdit] = useState(false)
	//Hook to work with api
	const navigate = useNavigate()

	//Popups
	//Course
	const {
		isShow: courseShow,
		setIsShow: setCourseShow,
		ref: courseRef
	} = useOutside(false)
	//Employee
	const {
		isShow: teammateShow,
		setIsShow: setTeammateShow,
		ref: teammateRef
	} = useOutside(false)
	//Material
	const {
		isShow: materialShow,
		setIsShow: setMaterialShow,
		ref: materialRef
	} = useOutside(false)
	//Word
	const {
		isShow: wordShow,
		setIsShow: setWordShow,
		ref: wordRef
	} = useOutside(false)
	//FAQ
	const {
		isShow: faqShow,
		setIsShow: setFaqShow,
		ref: faqRef
	} = useOutside(false)

	//Data fetching
	//Team data
	//Team
	const { data: teamData, isLoading: teamLoading } =
		teamApi.useGetTeamQuery(teamId)
	//Courses
	const { data: coursesData, isLoading: coursesLoading } =
		courseApi.useGetTeamCoursesQuery(teamId)
	//Team employees
	const { data: teamEmployeesData, isLoading: employeesLoading } =
		employeeApi.useGetTeamMembersQuery(teamId)
	//Materials
	const { data: materialsData, isLoading: materialsLoading } =
		materialApi.useGetTeamMaterialsQuery(teamId)
	//Words
	const { data: wordsData, isLoading: wordsLoading } =
		wordApi.useGetTeamWordsQuery(teamId)
	//FAQs
	const {
		data: faqsData,
		isLoading: faqLoading,
		isFetching: faqFetching
	} = faqApi.useGetTeamFaqsQuery(teamId)
	//User assigned courses
	const {
		data: assignedCoursesData,
		isFetching: progressFetching,
		isLoading: progressLoading,
		refetch: refetchProgresses
	} = userProgressApi.useGetUserProgressesCoursesQuery(userId)
	//End of data fetching

	//Data sorting

	//Team
	const [team, setTeam] = useState(teamData?.data)
	const [teamEmployees, setTeamEmployees] = useState(teamEmployeesData)
	//Courses
	const [courses, setCourses] = useState(coursesData?.data)
	//Materials
	const [materials, setMaterials] = useState(materialsData?.data)
	//words
	const [words, setWords] = useState(wordsData?.data)
	//FAQs
	const [faqs, setFaqs] = useState(faqsData?.data)

	//UseEffects to work with api
	//Team
	useEffect(() => {
		setTeam(teamData?.data)
	}, [teamData])
	//Team employees
	useEffect(() => {
		setTeamEmployees(teamEmployeesData)
	}, [teamEmployeesData])
	//Courses
	useEffect(() => {
		setCourses(coursesData?.data)
	}, [coursesData])
	//Materials
	useEffect(() => {
		setMaterials(materialsData?.data)
	}, [materialsData])
	//words
	useEffect(() => {
		setWords(wordsData?.data)
	}, [wordsLoading])
	//FAQs
	useEffect(() => {
		setFaqs(faqsData?.data)
	}, [faqFetching])
	//User progress refetch
	useEffect(() => {
		refetchProgresses()
	}, [])

	//End of data sorting

	//Functions
	//Api functions
	//Word
	//Delete word api
	const [deleteWordApi] = wordApi.useDeleteWordMutation()
	//Delete faq function
	const deleteWord = async (wordId: number) => {
		//Delete current faq from faqs list
		setWords(currentWordList =>
			//@ts-ignore
			currentWordList.filter(word => word.id !== wordId)
		)
		//Delete faq
		await deleteWordApi(wordId)
	}
	//Faq
	//Delete faq api
	const [deleteFaqApi] = faqApi.useDeleteFaqMutation()
	//Delete faq function
	const deleteFaq = async (faqId: number) => {
		//Delete current faq from faqs list
		setFaqs(currentFaqList =>
			//@ts-ignore
			currentFaqList.filter(faq => faq.id !== faqId)
		)
		//Delete faq
		await deleteFaqApi(faqId)
	}

	//Filtering
	const filtredWords = FilterWords(words, activeFilter)
	//Assigned courses ids array
	const assignedCoursesIds = useMemo(() => {
		//Empty array
		let coursesIds: number[] = []
		//Check does the progress data exist
		if (assignedCoursesData?.data) {
			//Add assigned courses ids to array
			for (const userProgress of assignedCoursesData.data) {
				coursesIds.push(userProgress.attributes.course.data.id)
			}
		}
		//Return array
		return coursesIds
	}, [progressFetching])

	//Controls
	const { data: userTeamData } = employeeApi.useGetEmployeeTeamQuery(userId)
	const userTeamId = userTeamData?.data[0].id
	const isUserInTeam = String(teamId) === String(userTeamId)
	const userRoleType = userRole?.type || 'employee'
	const canUserEditAdmin =
		userRoleType === 'administrator' ||
		userRoleType === 'manager' ||
		userRoleType === 'editor'
	const canUserEdit = isUserInTeam || canUserEditAdmin

	if (
		teamLoading ||
		coursesLoading ||
		employeesLoading ||
		materialsLoading ||
		wordsLoading ||
		faqLoading ||
		progressLoading
	)
		return <Loader />
	if (!team) return <Page404 />

	return (
		<>
			{/*Popups*/}
			<CoursePopup
				popupShow={courseShow}
				setPopupShow={setCourseShow}
				popupRef={courseRef}
				setValue={setCourses}
			/>
			<TeammatePopup
				popupShow={teammateShow}
				setPopupShow={setTeammateShow}
				popupRef={teammateRef}
				teamName={team.attributes.name}
				setValue={setTeamEmployees}
			/>
			<MaterialPopup
				popupShow={materialShow}
				setPopupShow={setMaterialShow}
				popupRef={materialRef}
				setValue={setMaterials}
			/>
			<WordPopup
				popupShow={wordShow}
				setPopupShow={setWordShow}
				popupRef={wordRef}
				setValue={setWords}
			/>
			<FaqPopup
				popupShow={faqShow}
				setPopupShow={setFaqShow}
				popupRef={faqRef}
				setValue={setFaqs}
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
								className={`${
									canUserEditAdmin && isUserInTeam && Styles.CursorPointer
								}`}
								key={course.id}
								onClick={
									canUserEditAdmin && isUserInTeam
										? () => navigate(`/knowledge-base/course/${course.id}`)
										: () => {}
								}
							>
								<Course
									id={course.id}
									name={course.attributes.name}
									description={course.attributes.description}
									icons={course.attributes.icons.data}
									disabled={
										!isUserInTeam ||
										canUserEditAdmin ||
										assignedCoursesIds.includes(course.id)
									}
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
					{teamEmployees &&
						teamEmployees.map(employee => (
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

			{/*<section className={Styles.Section}>*/}
			{/*	<div className={`${Styles.Header} ${Styles.GlossaryHeader}`}>*/}
			{/*		<Title text={'Materials'} />*/}
			{/*		<ul className={Styles.GlossaryFilters}>*/}
			{/*			{materialsFilters.map(filter => (*/}
			{/*				<li key={filter}>*/}
			{/*					<button*/}
			{/*						className={`${Text.Caption1Regular} ${*/}
			{/*							materialFilter === filter && Styles.GlossaryActiveFilter*/}
			{/*						}`}*/}
			{/*						onClick={() => setMaterialFilter(filter)}*/}
			{/*					>*/}
			{/*						{filter}*/}
			{/*					</button>*/}
			{/*				</li>*/}
			{/*			))}*/}
			{/*		</ul>*/}
			{/*		{canUserEdit && (*/}
			{/*			<div className={Styles.HeaderButtons}>*/}
			{/*				<EditButton action={() => {}} />*/}
			{/*				<AddButton action={() => setMaterialShow(true)} />*/}
			{/*			</div>*/}
			{/*		)}*/}
			{/*	</div>*/}
			{/*	<div className={Styles.MaterialsGrid}>*/}
			{/*		{materials &&*/}
			{/*			materials.map(material => (*/}
			{/*				<Material*/}
			{/*					key={material.id}*/}
			{/*					format={material.attributes.format}*/}
			{/*					name={material.attributes.name}*/}
			{/*					description={material.attributes.description}*/}
			{/*					link={material.attributes.file.data.attributes.url}*/}
			{/*				/>*/}
			{/*			))}*/}
			{/*	</div>*/}
			{/*</section>*/}

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
							{wordEdit && <AddButton action={() => setWordShow(true)} />}
							<LargeEgitButton
								editing={wordEdit}
								toggleEdit={() => setWordEdit(edit => !edit)}
							/>
						</div>
					)}
				</div>
				<ul className={Styles.GlossaryList}>
					{filtredWords &&
						filtredWords.map(word => (
							<Word
								key={word.id}
								id={word.id}
								name={word.attributes.name}
								definition={word.attributes.definition}
								editState={wordEdit}
								deleteFunction={deleteWord}
							/>
						))}
				</ul>
			</section>

			<section className={Styles.Section}>
				<div className={Styles.Header}>
					<Title text={'FAQ'} />
					{canUserEdit && (
						<div className={Styles.HeaderButtons}>
							{faqEdit && <AddButton action={() => setFaqShow(true)} />}
							<LargeEgitButton
								editing={faqEdit}
								toggleEdit={() => setFaqEdit(edit => !edit)}
							/>
						</div>
					)}
				</div>
				<div className={Styles.FAQGrid}>
					{faqs &&
						faqs.map(FAQ => (
							<Faq
								key={FAQ.id}
								id={FAQ.id}
								question={FAQ.attributes.question}
								answer={FAQ.attributes.answer}
								editState={faqEdit}
								deleteFunction={deleteFaq}
							/>
						))}
				</div>
			</section>
		</>
	)
}

export default TeamPage