import { FC, PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '@/components/loader/loader'
import useAuth from '@/hooks/useAuth.hook'


const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const { user, isLoading } = useAuth()
	const path = useLocation().pathname

	if (isLoading) return <Loader />
	if (path === ('/login' || '/register')) return <>{children}</>
	if (!user) return <Navigate to={'/login'} />
	return <>{children}</>
}

export default AuthProvider