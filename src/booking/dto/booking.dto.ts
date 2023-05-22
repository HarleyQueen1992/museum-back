import {
	IsArray,
	IsEmail,
	IsPhoneNumber,
	IsString,
	ValidateNested
} from 'class-validator'
import { TicketDto } from './ticket.dto'
import { Type } from 'class-transformer'

export class BookingDto {
	@IsString()
	fio: string

	@IsEmail()
	email: string

	@IsPhoneNumber()
	phone: string

	@ValidateNested({ each: true })
	@Type(() => TicketDto)
	tickets: TicketDto[]
}
