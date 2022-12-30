import React, {
	ChangeEvent,
	DragEvent,
	FC,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ErrorPage from '@/pages/error/error.page'
import AssignedCourseMini from '@/components/assigned-course/mini/assigned-course'
import { AssignedCourseInterface } from '@/components/assigned-course/mini/assigned-course.interface'
import Avatar from '@/components/avatar/avatar'
import Certificate from '@/components/certificate/certificate'
import { CertificateInterface } from '@/components/certificate/sertificate.interface'
import Field from '@/components/generic/field/field'
import Loader from '@/components/loader/loader'
import Popup from '@/components/popup/popup'
import { useAuth } from '@/hooks/useAuth.hook'
import { useOutside } from '@/hooks/useOutside.hook'
import { useTheme } from '@/hooks/useTheme.hook'
import { calculateProgress } from '@/utils/calculate-progress.util'
import { BASE_API_URL } from '@/store/api/axios'
import employeeApi from '@/store/api/employee.api'
import Text from '@/styles/text.module.scss'
import Vars from '@/vars/vars.json'
import { ProfileInputInterface } from './profile-input.interface'
import Styles from './profile.module.scss'


const ProfilePage: FC = () => {
	//Hooks
	const { darkmode } = useTheme()
	const { user } = useAuth()
	const { employee_id: userId } = useParams()
	const path = useLocation().pathname
	const { isShow, setIsShow, ref: popupRef } = useOutside(false)

	const isProfile = path === '/profile'
	const profileId: number = isProfile && user ? user.id : userId ? +userId : 0

	//Data fetch
	const { data: userData, isLoading: userDataLoading } =
		employeeApi.useGetEmployeeQuery(profileId)
	const { data: learnings, isLoading: learningsLearning } =
		employeeApi.useGetEmployeeLearningsQuery(profileId)
	//End of fetching data

	const User = { ...userData }
	const ProfileData: ProfileInputInterface[] = [
		{ label: 'Name', value: User.name, type: 'text' },
		{ label: 'Surname', value: User.surname, type: 'text' },
		{ label: 'Email', value: User.email, type: 'text' },
		{ label: 'Team', value: User?.team?.name, type: 'text' },
		{ label: 'Job title', value: User.job_title, type: 'text' },
		{ label: 'Phone number', value: User.phone, type: 'text' },
		{ label: 'Starting date', value: User?.starting_date, type: 'text' },
		{ label: 'Line manager', value: User?.line_manager?.name, type: 'text' }
	]

	const [activeSwitch, setActiveSwitch] = useState<'Assigned' | 'Certificates'>(
		'Assigned'
	)

	//Assigned courses array
	const { assignedCourses, certificates } = useMemo(() => {
		let assignedCourses: AssignedCourseInterface[] = []
		let certificates: CertificateInterface[] = []

		if (learnings) {
			for (const learning of learnings) {
				const lessonsCount = (): number => {
					let lessonsCount = 0

					for (const module of learning.course.modules) {
						lessonsCount += module.lessons.length
					}

					return lessonsCount
				}

				const testsCount = (): number => {
					let testsCount = 0

					for (const module of learning.course.modules) {
						testsCount += module.tests.length
					}

					return testsCount
				}

				const totalProgress = calculateProgress(
					lessonsCount(),
					learning.passed_lessons.length,
					testsCount(),
					learning.passed_tests.length
				)

				if (totalProgress !== 100) {
					const formattedAssignedCourse = {
						id: learning.id,
						name: learning.course.name,
						progress: totalProgress,
						startedOn: learning.created_at
					}

					assignedCourses.push(formattedAssignedCourse)
				} else {
					const formattedCertificate = {
						id: learning.id,
						name: learning.course.name,
						startedOn: learning.created_at,
						finishedOn: learning.updated_at
					}

					certificates.push(formattedCertificate)
				}
			}
		}

		return { assignedCourses, certificates }
	}, [learnings])

	//For popup
	const [drag, setDrag] = useState(false)
	const [uploadError, setUploadError] = useState(false)

	const [changeAvatarApi] = employeeApi.useChangeAvatarMutation()

	const changeAvatar = async () => {
		setDrag(false)
		setUploadError(false)

		const form = uploadFormRef.current

		if (form === null) return

		changeAvatarApi(form)

		setIsShow(false)
	}

	const dragStartHandler = (event: DragEvent<HTMLElement>) => {
		event.preventDefault()
		setDrag(true)
	}

	const dragLeaveHandler = (event: DragEvent<HTMLElement>) => {
		event.preventDefault()
		setDrag(false)
	}

	const onDropHandler = async (event: DragEvent<HTMLElement>) => {
		event.preventDefault()

		if (event.dataTransfer.files.length > 1) {
			setUploadError(true)
			setDrag(false)

			return
		}

		if (!event.dataTransfer.files[0].type.startsWith('image/')) {
			setUploadError(true)
			setDrag(false)

			return
		}

		if (avatarRef.current !== null) {
			avatarRef.current.files = event.dataTransfer.files
			await changeAvatar()
		}
	}

	const inputChangeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files !== null) {
			await changeAvatar()
		}
	}

	const avatarRef = useRef<HTMLInputElement>(null)
	const uploadFormRef = useRef<HTMLFormElement>(null)

	const memoAvatarRef = useMemo(() => avatarRef, [isShow])

	useEffect(() => {
		return () => {
			setDrag(false)
			setUploadError(false)
		}
	}, [isShow])

	if (userDataLoading || learningsLearning) return <Loader />
	if (!userData) return <ErrorPage error={404} />

	return (
		<>
			<Popup isOpened={isShow} setIsOpened={setIsShow} reference={popupRef}>
				<form id={Styles.UploadForm} ref={uploadFormRef}>
					<input
						ref={memoAvatarRef}
						name={'avatar'}
						id={Styles.UploadAvatar}
						type={'file'}
						accept={'image/*'}
						onChange={inputChangeAvatar}
					/>
					<label
						htmlFor={Styles.UploadAvatar}
						className={`${Styles.DragAndDrop} ${Text.H6Bold}`}
						style={{
							backgroundColor: uploadError
								? `${Vars['system-red-color']}50`
								: '',
							borderColor: uploadError ? Vars['system-red-color'] : '',
							opacity: !drag ? 1 : 0.5
						}}
						onDragStart={event => dragStartHandler(event)}
						onDragLeave={event => dragLeaveHandler(event)}
						onDragOver={event => dragStartHandler(event)}
						onDrop={event => onDropHandler(event)}
					>
						{!uploadError ? (
							!drag ? (
								<span>
									Drag and drop your image here or{' '}
									<span className={Styles.Underline}>choose file</span>
								</span>
							) : (
								'Release the file'
							)
						) : (
							'Some error occurred!'
						)}
					</label>
				</form>
			</Popup>
			<section
				className={`${Styles.Profile} ${darkmode && Styles.ProfileDark}`}
			>
				<div className={Styles.ProfileInfo}>
					<div className={Styles.ProfileAvatar}>
						<div>
							<Avatar
								width={'128px'}
								height={'168px'}
								alt={'Avatar'}
								avatarPath={
									User?.avatar_path
										? `${BASE_API_URL}${User.avatar_path}`
										: 'https://via.placeholder.com/128x168'
								}
							/>
						</div>
						{(user?.id === Number(userId) || isProfile) && (
							<button
								onClick={() => setIsShow(true)}
								className={`${Text.Caption1Medium} ${Styles.AvatarEdit}`}
							>
								Change avatar
							</button>
						)}
					</div>
					<div className={Styles.ProfileGrid}>
						{ProfileData.map((inputData, index) => (
							<div key={index} className={`${Styles.ProfileInput}`}>
								<h6 className={Text.H6Bold}>{inputData.label}</h6>
								<Field
									name={inputData.label}
									type={inputData.type}
									theme={!darkmode ? 'grey' : 'black'}
									value={inputData.value || ''}
									disabled
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className={Styles.SwitchSection}>
				<div className={Styles.Switcher}>
					<button
						className={`${Text.Body1Regular} ${
							activeSwitch === 'Assigned'
								? !darkmode
									? Styles.SwitcherPointActive
									: Styles.SwitcherPointActiveDark
								: Styles.SwitcherPoint
						}`}
						onClick={() => setActiveSwitch('Assigned')}
					>
						Assigned
					</button>
					<div />
					<button
						className={`${Text.Body1Regular} ${
							activeSwitch === 'Certificates'
								? !darkmode
									? Styles.SwitcherPointActive
									: Styles.SwitcherPointActiveDark
								: Styles.SwitcherPoint
						}`}
						onClick={() => setActiveSwitch('Certificates')}
					>
						Certificates
					</button>
				</div>
				{activeSwitch === 'Assigned' ? (
					<>
						<div className={Styles.AssignedGrid}>
							{assignedCourses.map(assigned => (
								<AssignedCourseMini
									key={assigned.id}
									id={assigned.id}
									name={assigned.name}
									progress={assigned.progress}
									startedOn={assigned.startedOn}
								/>
							))}
						</div>
					</>
				) : activeSwitch === 'Certificates' ? (
					<>
						<div className={Styles.CertificatesGrid}>
							{certificates.map(certificate => (
								<Certificate
									key={certificate.id}
									id={certificate.id}
									name={certificate.name}
									startedOn={certificate.startedOn}
									finishedOn={certificate.finishedOn}
								/>
							))}
						</div>
					</>
				) : (
					<></>
				)}
			</section>
		</>
	)
}

export default ProfilePage