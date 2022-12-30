import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import AdminPanelPage from '@/pages/admin-panel/admin-panel'
import CoursePage from '@/pages/course/course.page'
import ErrorPage from '@/pages/error/error.page'
import LessonPage from '@/pages/lesson/lesson.page'
import LoginPage from '@/pages/login/login.page'
import MylearningPage from '@/pages/my-learning/my-learning.page'
import ProfilePage from '@/pages/profile/profile.page'
import TeamPage from '@/pages/team/team.page'
import TestPage from '@/pages/test/test.page'
import AuthProvider from '@/providers/auth.provider'
import store, { persistor } from '@/store/store'
import Layout from './layout/layout'
import KnowledgebasePage from './pages/knowledge-base/knowledge-base.page'


function App() {
	return (
		<>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<BrowserRouter>
						<AuthProvider>
							<Layout>
								<Routes>
									<Route
										path='/'
										element={<Navigate to={'/knowledge-base'} />}
									/>
									<Route path='/login' element={<LoginPage />} />
									<Route path='/profile' element={<ProfilePage />} />
									<Route
										path='/employee/:employee_id'
										element={<ProfilePage />}
									/>
									<Route path='/my-learning' element={<MylearningPage />} />
									<Route
										path='/knowledge-base'
										element={<KnowledgebasePage />}
									/>
									<Route
										path='/knowledge-base/:dep_id'
										element={<KnowledgebasePage />}
									/>
									<Route
										path='/knowledge-base/team/:team_id'
										element={<TeamPage />}
									/>
									{/*End of Course*/}
									{/*Course for creating*/}
									<Route
										path='/knowledge-base/course/:course_id/'
										element={<CoursePage />}
									/>
									<Route
										path='/knowledge-base/course/:course_id/lesson/:lesson_id'
										element={<LessonPage />}
									/>
									<Route
										path='/knowledge-base/course/:course_id/test/:test_id'
										element={<TestPage />}
									/>
									{/*End of course for creating*/}
									{/*Course for learning*/}
									<Route
										path='/my-learning/course/:course_id/'
										element={<CoursePage />}
									/>
									<Route
										path='/my-learning/course/:course_id/lesson/:lesson_id'
										element={<LessonPage />}
									/>
									<Route
										path='/my-learning/course/:course_id/test/:test_id'
										element={<TestPage />}
									/>
									{/*End of course for learning*/}
									{/*End of Course*/}
									<Route path='/admin-panel' element={<AdminPanelPage />} />
									<Route path='/*' element={<ErrorPage error={404} />} />
								</Routes>
							</Layout>
						</AuthProvider>
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</>
	)
}

export default App