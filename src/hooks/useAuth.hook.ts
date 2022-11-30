import useTypedSelectorHook from './useTypedSelector.hook'

const useAuth = () => useTypedSelectorHook(state => state.auth)

// const useAuth = () => {
// 	let {
// 		user,
// 		jwt,
// 		isLoading: authDataLoading
// 	} = useTypedSelectorHook(state => state.auth)
//
// 	const userId = user?.id || 0
// 	const { data: userTeamData, isLoading: teamDataLoading } =
// 		employeeApi.useGetEmployeeTeamQuery(userId)
//
// 	if (user !== null && userTeamData?.data[0]) {
// 		user.team = {
// 			id: userTeamData.data[0].id,
// 			name: userTeamData.data[0].attributes.name
// 		}
// 	}
//
// 	const isLoading = !!authDataLoading || !!teamDataLoading
//
// 	return {
// 		user,
// 		jwt,
// 		isLoading
// 	}
// }

export default useAuth