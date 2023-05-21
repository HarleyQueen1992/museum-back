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

export class EventDto {
	@IsString()
	@MaxLength(200)
	name: string

	@IsString()
	@IsPhoneNumber()
	phone: string

	@IsString()
	@MaxLength(150)
	address: string

	@IsString()
	@IsOptional()
	banner?: string

	@IsString()
	schedule: string

	@IsString()
	@MaxLength(400)
	description: string

	@Transform(({ value }) => new Date(value))
	@IsDate()
	startDate: Date

	@Transform(({ value }) => new Date(value))
	@IsDate()
	expirationDate: Date

	@IsString()
	aboutMe: string

	@IsNumber()
	adultPrice: number

	@IsNumber()
	childPrice: number

	@IsArray()
	audience: number[]
}
