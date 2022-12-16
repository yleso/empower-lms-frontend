export const calculateProgress = (
	totalLessons: number,
	passedLessons: number,
	totalTests: number,
	passedTests: number
): number => {
	const total = totalLessons + totalTests
	const got = passedLessons + passedTests

	return got / (total / 100)
}
