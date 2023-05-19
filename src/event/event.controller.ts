import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UploadedFiles,
	UseInterceptors,
	ValidationPipe
} from '@nestjs/common'
import { EventService } from './event.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { EventDto } from './dto/event.dto'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

@Controller('event')
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@Get()
	findAll(@Query() param: any) {
		return this.eventService.pagination(param)
	}

	@Post()
	@Auth()
	@UseInterceptors(FileFieldsInterceptor([{ name: 'banner', maxCount: 1 }]))
	createEvent(
		@UploadedFiles() files,
		@Body(new ValidationPipe()) dto: EventDto
	) {
		const { banner } = files
		return this.eventService.createEvent(dto, banner && banner[0])
	}

	@Put(':id')
	@Auth()
	@UseInterceptors(FileFieldsInterceptor([{ name: 'banner', maxCount: 1 }]))
	updateEventById(
		@UploadedFiles() files,
		@Param('id') id: number,
		@Body(new ValidationPipe()) dto: EventDto
	) {
		const { banner } = files
		return this.eventService.updateEventById(id, dto, banner && banner[0])
	}
	@Delete(':id')
	@Auth()
	deleteEventById(@Param('id') id: number) {
		return this.eventService.deleteEventById(id)
	}
}
