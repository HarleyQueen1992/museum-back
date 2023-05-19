import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator'

export class MainDto {
	@IsPhoneNumber()
	@IsString()
	phone: string

	@IsEmail()
	@IsString()
	email: string

	@IsString()
	address: string

	@IsString()
	vk_link: string

	@IsString()
	inst_link: string

	@IsString()
	telegram_link: string

	@IsString()
	@IsOptional()
	logo: string
}
