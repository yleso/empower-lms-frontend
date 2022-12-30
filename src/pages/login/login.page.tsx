import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ReactPlayer from 'react-player'
import { Navigate, useLocation } from 'react-router-dom'
import Button from '@/components/generic/buttons/primary-button/button'
import Field from '@/components/generic/field/field'
import Loader from '@/components/loader/loader'
import EmblemLogo from '@/assets/img/logo/emblem-logo.png'
import { useActions } from '@/hooks/useActions.hook'
import { useAuth } from '@/hooks/useAuth.hook'
import { useTheme } from '@/hooks/useTheme.hook'
import Text from '@/styles/text.module.scss'
import Vars from '@/vars/vars.json'
import { AuthFieldsInterface } from './auth-fields.interface'
import Styles from './login.module.scss'


const LoginPage: FC = () => {
	const { darkmode } = useTheme()
	const type = useLocation().pathname.replace('/', '')
	const { login } = useActions()
	const { user, isLoading } = useAuth()

	const { register, handleSubmit } = useForm<AuthFieldsInterface>()

	const onSubmit: SubmitHandler<AuthFieldsInterface> = data => {
		login(data)
	}

	if (isLoading) return <Loader />
	if (user) return <Navigate to={'/'} />

	return (
		<>
			<div className={Styles.Page}>
				<div className={`${Styles.Sidebar} ${darkmode && Styles.SidebarDark}`}>
					<div className={Styles.SidebarTop}>
						<div className={Styles.SidebarLogo}>
							<img
								src={EmblemLogo}
								height={64}
								width={64}
								alt={`${Vars.company} logo`}
							/>
						</div>
						<p>Sign in in {Vars.company} LMS</p>
					</div>

					{/*Form*/}

					<form className={Styles.Form} onSubmit={handleSubmit(onSubmit)}>
						<div className={Styles.FormInput}>
							<label className={Text.H6Bold}>
								{type === 'login' ? 'Email' : 'Password'}
							</label>
							<Field
								type={'text'}
								theme={!darkmode ? 'white' : 'black'}
								required
								{...register('email')}
								reference={register('email').ref}
							/>
						</div>
						<div className={Styles.FormInput}>
							<label className={Text.H6Bold}>Password</label>
							<Field
								type={'password'}
								theme={!darkmode ? 'white' : 'black'}
								required
								{...register('password')}
								reference={register('password').ref}
							/>
						</div>
						{/*TODO Make auth errors*/}
						{false && (
							<span className={`${Text.Body2Regular} ${Styles.AuthLoginError}`}>
								Incorrect email or password
							</span>
						)}
						<Button text={'Log in'} disabled={isLoading} submit fill large />
					</form>

					{/*Form ends*/}
				</div>

				{/*Guide side*/}
				<div className={`${Styles.Guide} ${darkmode && Styles.GuideDark}`}>
					<div className={Styles.GuideContent}>
						<h2 className={`${Styles.GuideTitle} ${Text.TitleRegular}`}>
							Learn how to work with our platform
						</h2>
						<div className={Styles.GuideVideo}>
							<ReactPlayer
								width={'100%'}
								height={'100%'}
								pip
								controls
								url={'https://www.youtube.com/watch?v=vG-iQjm53As'}
							/>
						</div>
					</div>
				</div>
				{/*End of Guide side*/}
			</div>
		</>
	)
}

export default LoginPage