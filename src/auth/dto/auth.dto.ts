import { IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsString()
	login: string

	@MinLength(5, { message: 'Password must be at least 5 characters long' })
	@IsString()
	password: string
}
