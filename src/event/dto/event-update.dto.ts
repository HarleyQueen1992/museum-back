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

export class EventUpdateDto {
	@IsString()
	@MaxLength(200)
	@IsOptional()
	name?: string

	@IsString()
	@IsPhoneNumber()
	@IsOptional()
	phone?: string

	@IsString()
	@MaxLength(150)
	@IsOptional()
	address?: string

	@IsString()
	@IsOptional()
	banner?: string

	@IsString()
	@IsOptional()
	schedule?: string

	@IsString()
	@MaxLength(400)
	@IsOptional()
	description?: string

	@Transform(({ value }) => new Date(value))
	@IsDate()
	@IsOptional()
	startDate?: Date

	@Transform(({ value }) => new Date(value))
	@IsDate()
	@IsOptional()
	expirationDate?: Date

	@IsString()
	@IsOptional()
	aboutMe?: string

	@IsNumber()
	@IsOptional()
	adultPrice?: number

	@IsNumber()
	@IsOptional()
	childPrice?: number

	@IsArray()
	@IsOptional()
	audience?: number[]
}
