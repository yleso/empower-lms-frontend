import { BaseInterface } from '@/types/base.interface'
import { TeamInterface } from '@/types/team/team.interface'

export interface WordInterface extends BaseInterface {
	name: string
	definition: string
}

export interface WordWithTeamInterface extends WordInterface {
	team: TeamInterface
}