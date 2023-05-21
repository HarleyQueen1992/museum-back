import { Transform } from 'class-transformer'
import { IsArray, IsDate } from 'class-validator'
import { TimeDto } from 'src/time/dto/time.dto'

export class ScheduleDto {
	@Transform(({ value }) => new Date(value))
	@IsDate()
	date: Date

	@IsArray()
	times: TimeDto[]
}
