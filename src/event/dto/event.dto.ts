import { Transform } from 'class-transformer'
import {
	IsArray,
	IsDate,
	IsNumber,
	IsOptional,
	IsPhoneNumber,
	IsString,
	MaxLength
} from 'class-validator'
import { Audience } from 'src/typeorm/entities/Audience'

export class EventDto {
	@IsString()
	@MaxLength(200)
	title: string

	@IsString()
	@MaxLength(200)
	sub_title: string

	@IsString()
	@IsOptional()
	banner?: string

	@IsString()
	@IsOptional()
	preview?: string

	@IsString()
	description: string

	@IsString()
	aboutMe: string

}
