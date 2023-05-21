import {
	IsDateString,
	IsNumberString,
	IsOptional,
	IsString
} from 'class-validator'

export class QueryDto {
	@IsNumberString()
	@IsOptional()
	limit?: number

	@IsNumberString()
	@IsOptional()
	page?: number

	@IsString()
	@IsOptional()
	slug?: string

	@IsDateString()
	@IsOptional()
	date?: Date

	@IsNumberString()
	@IsOptional()
	category?: number

	@IsString()
	@IsOptional()
	audit?: string
}
