import { IsNumber, IsString } from 'class-validator'

export class TimeDto {
	@IsString()
	time: string

	@IsNumber()
	countPlaces: number
}
