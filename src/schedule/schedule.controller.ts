import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	ValidationPipe
} from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { ScheduleDto } from './dto/schedule.dto'

@Controller('schedule')
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}

	@Get(':id')
	findScheduleByEvent(@Param('id') id: number) {
		return this.scheduleService.findScheduleByEvent(id)
	}

	@Post(':id')
	createSchedule(
		@Param('id') id: number,
		@Body(new ValidationPipe()) dto: ScheduleDto
	) {
		return this.scheduleService.createSchedule(id, dto)
	}

	@Delete(':id')
	@HttpCode(204)
	deleteShedule(@Param('id') id: number) {
		return this.scheduleService.deleteDateById(id)
	}
}
