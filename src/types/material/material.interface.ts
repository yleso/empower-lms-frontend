export interface MaterialInterface {
	id: number
	attributes: {
		name: string
		format: string
		description: string
		file: {
			data: {
				id: number
				attributes: {
					name: string
					url: string
				}
			}
		}
	}
}
