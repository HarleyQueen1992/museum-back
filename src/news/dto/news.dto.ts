import { IsOptional, IsString, MaxLength } from 'class-validator'

export class NewsDto {
	@IsString()
	@MaxLength(250)
	title: string

	@IsString()
	@IsOptional()
	banner?: string

	@IsString()
	body: string
}
