import { BaseInterface } from '@/types/base.interface'
import { TeamInterface } from '@/types/team/team.interface'

export interface FaqInterface extends BaseInterface {
	question: string
	answer: string
}

export interface FaqWithTeamInterface extends FaqInterface {
	team: TeamInterface
}