import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	ValidationPipe
} from '@nestjs/common'
import { TimeService } from './time.service'
import { TimeDto } from './dto/time.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('time')
export class TimeController {
	constructor(private readonly timeService: TimeService) {}

	@Get(':id')
	findTimeBySchedule(@Param('id') id: number) {
		return this.timeService.findTimeBySchedule(id)
	}
	@Get('/detail/:id')
	findTimeDetail(@Param('id') id: number) {
		return this.timeService.findTimeByDetail(id)
	}

	@Post(':id')
	@Auth()
	createTimeForSchedule(
		@Param('id') id: number,
		@Body(new ValidationPipe()) dto: TimeDto
	) {
		return this.timeService.createTimeForSchedule(id, dto)
	}
}
