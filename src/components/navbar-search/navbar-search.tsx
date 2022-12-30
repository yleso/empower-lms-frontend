import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'tabler-icons-react'
import { SearchResultInterface } from '@/components/navbar-search/search-result.interface'
import { useTheme } from '@/hooks/useTheme.hook'
import courseApi from '@/store/api/course.api'
import employeeApi from '@/store/api/employee.api'
import faqApi from '@/store/api/faq.api'
import wordApi from '@/store/api/word.api'
import Text from '@/styles/text.module.scss'
import Styles from './navbar-search.module.scss'


const NavbarSearch: FC = () => {
	//Hooks
	//Theme state hook
	const { darkmode } = useTheme()
	//Search text state hook
	const [searchText, setSearchText] = useState<string>('')
	//Search results state hook
	const [searchResults, setSearchResults] = useState<SearchResultInterface[]>()

	//Search api functions
	//Courses
	const [searchCourses, { data: coursesSearchData }] =
		courseApi.useSearchCoursesMutation()
	//Employees
	const [searchUsers, { data: usersSearchData }] =
		employeeApi.useSearchUsersMutation()
	//Words
	const [searchWords, { data: wordsSearchData }] =
		wordApi.useSearchWordsMutation()
	//Faqs
	const [searchFaqs, { data: faqsSearchData }] = faqApi.useSearchFaqsMutation()

	useEffect(() => {
		if (searchText === '') return setSearchResults(undefined)

		const search = async () => {
			//Create empty array wth new search results
			let newSearchResults: SearchResultInterface[] = []

			//Search courses
			await searchCourses(searchText).then(() => {
				//Check is there course search data
				if (coursesSearchData) {
					//Set courses to the search results data
					for (const course of coursesSearchData) {
						newSearchResults.push({
							title: course.team.name,
							text: course.description,
							link: `/knowledge-base/team/${course.team.id}`
						})
					}
				}
			})

			//Search users
			await searchUsers(searchText).then(() => {
				//Check is there users search data
				if (usersSearchData) {
					//Set users to the search results data
					for (const user of usersSearchData) {
						const searchResultsTexts = newSearchResults.map(
							result => result.text
						)
						if (!searchResultsTexts.includes(user.email)) {
							newSearchResults.push({
								title: `${user.name} ${user.surname}`,
								text: user.email,
								link: `/employee/${user.id}`
							})
						}
					}
				}
			})

			//Search words
			await searchWords(searchText).then(() => {
				//Check is there words search data
				if (wordsSearchData) {
					//Set users to the search results data
					for (const word of wordsSearchData) {
						newSearchResults.push({
							title: word.name,
							text: word.definition,
							link: `/knowledge-base/team/${word.team.id}`
						})
					}
				}
			})

			//Search faqs
			await searchFaqs(searchText).then(() => {
				//Check is there faqs search data
				if (faqsSearchData) {
					//Set users to the search results data
					for (const faq of faqsSearchData) {
						newSearchResults.push({
							title: faq.question,
							text: faq.answer,
							link: `/knowledge-base/team/${faq.team.id}`
						})
					}
				}
			})

			//Return search results value
			return newSearchResults
		}

		search().then(searchResultsData => {
			setSearchResults(searchResultsData)
		})
	}, [searchText])

	return (
		<>
			<form
				className={`${Styles.NavbarSearch} ${
					darkmode && Styles.NavbarSearchDark
				}`}
			>
				<input
					type='text'
					placeholder='Search something'
					value={searchText}
					onChange={event => setSearchText(event.target.value)}
				/>
				<button type='submit'>
					<Search size={16} />
				</button>
				{searchResults && (
					<div
						className={`${Styles.SearchResults} ${
							darkmode && Styles.SearchResultsDark
						}`}
					>
						{searchResults.map(result => (
							<Link
								onClick={() => {
									setSearchText('')
								}}
								to={result.link}
								key={result.text}
							>
								<div className={Styles.SearchResult}>
									<h6
										className={`${Text.Caption1Medium} ${Styles.SearchResultsTitle}`}
									>
										{result.title}
									</h6>
									<p
										className={`${Text.Caption2Regular} ${Styles.SearchResultsText}`}
									>
										{result.text}
									</p>
								</div>
							</Link>
						))}
					</div>
				)}
			</form>
		</>
	)
}

export default NavbarSearch