import { BaseInterface } from '@/types/base.interface'
import { ModuleInterface } from '@/types/module/module.interface'
import { TeamInterface } from '@/types/team/team.interface'

export interface CourseInterface extends BaseInterface {
	name: string
	description: string
	icons_urls: string[]
}

export interface CourseWithTeamInterface extends CourseInterface {
	team: TeamInterface
}

export interface FullCourseInterface extends CourseInterface {
	modules: ModuleInterface[]
}