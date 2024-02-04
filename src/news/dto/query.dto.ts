import { IsNumberString, IsOptional, IsString } from 'class-validator'

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
}
