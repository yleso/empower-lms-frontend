import employeeApi from '../store/api/employee.api'
import useAuth from './useAuth.hook'

export const useGetAuthRole = () => {
	const { user, isLoading: authLoading } = useAuth()
	const userId = user?.id || 0
	const { data: employee, isLoading: permissionLoading } =
		employeeApi.useGetEmployeeQuery(userId)

	const isLoading = authLoading || permissionLoading
	const userRole = employee?.role

	return { userRole, isLoading }
}