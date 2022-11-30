import { FC } from 'react'
import Page404 from '@/pages/404/404.page'
import Title from '@/components/generic/title/title'
import Loader from '@/components/loader/loader'
import { useGetAuthRole } from '@/hooks/useGetAuthRole.hook'


const AdminPanelPage: FC = () => {
	const { userRole, isLoading } = useGetAuthRole()

	if (isLoading) return <Loader />
	if (userRole?.type !== 'administrator') return <Page404 />

	return (
		<>
			<Title text={'Admin Panel'} />
		</>
	)
}

export default AdminPanelPage