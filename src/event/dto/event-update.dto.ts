
import {
	IsOptional,
	IsString,
	MaxLength
} from 'class-validator'

export class EventUpdateDto {
	@IsString()
	@MaxLength(200)
	@IsOptional()
	title?: string

	@IsString()
	@MaxLength(200)
	@IsOptional()
	sub_title?: string

	@IsString()
	@IsOptional()
	banner?: string
	
	@IsString()
	@IsOptional()
	preview?: string

	@IsString()
	@IsOptional()
	description?: string

	@IsString()
	@IsOptional()
	aboutMe?: string

}
