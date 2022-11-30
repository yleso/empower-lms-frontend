export const GeneratePassword = (passwordLength: number): string => {
	//Chars to be in password
	const numbers = '0123456789'
	const letters = 'abcdefghijklmnopqrstuvwxyz'
	const bigLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const specialChars = '!@#$%^&*()'
	const chars: string = numbers + letters + bigLetters + specialChars

	//Password variable
	let password = ''

	//Generator script
	while (password.length <= passwordLength) {
		let randomNumber = Math.floor(Math.random() * chars.length)
		let randomChar = chars[randomNumber]
		password += randomChar
	}

	return password
}
