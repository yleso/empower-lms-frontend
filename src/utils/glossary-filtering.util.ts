import { WordInterface } from '@/types/word/word.interface'

export const glossaryFilters = [
	'A-B',
	'C-D',
	'E-F',
	'G-H',
	'I-J',
	'K-L',
	'M-N',
	'O-P',
	'Q-R',
	'S-T',
	'U-V',
	'W-X',
	'Y-Z',
	'0-9'
]

export function FilterWords(
	words: Array<WordInterface> | undefined,
	filter: string
) {
	const bigLetters = filter.split('-')
	const toLower = (letters: Array<string>) => {
		const array: Array<string> = []
		letters.forEach(letter => {
			let letterLower = letter.toLowerCase()
			array.push(letterLower)
		})
		return array
	}

	const letters = [...bigLetters, ...toLower(bigLetters)]

	return words?.filter(word => {
		const wordName = word?.name

		return (
			wordName.startsWith(letters[0]) ||
			wordName.startsWith(letters[1]) ||
			wordName.startsWith(letters[2]) ||
			wordName.startsWith(letters[3])
		)
	})
}

export const materialsFilters = [
	'Documents',
	'Programs',
	'Pictures',
	'Video',
	'Audio',
	'Tables',
	'Code',
	'Presentations'
]