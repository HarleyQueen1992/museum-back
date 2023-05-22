import { IsBoolean, IsNumber } from 'class-validator'

export class TicketDto {
	@IsBoolean()
	isChild: boolean

	@IsNumber()
	id: number
}
