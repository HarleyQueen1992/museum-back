import { IsOptional, IsString, MaxLength } from 'class-validator'

export class NewsUpdateDto {
	@IsString()
	@MaxLength(250)
	@IsOptional()
	title?: string

	@IsString()
	@IsOptional()
	body?: string

	@IsString()
	@IsOptional()
	banner?: string
}
