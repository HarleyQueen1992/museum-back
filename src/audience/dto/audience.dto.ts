import { IsString } from 'class-validator'

export class AudienceDto {
	@IsString()
	name: string
}
