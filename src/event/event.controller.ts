import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
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
import { QueryDto } from './dto/query.dto'
import { EventUpdateDto } from './dto/event-update.dto'

@Controller('events')
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@Get()
	findAll(@Query() param: QueryDto) {
		return this.eventService.pagination(param)
	}

	@Get(':id')
	findById(@Param('id') id: number) {
		return this.eventService.findById(id)
	}

	@Post(':id')
	@Auth()
	@UseInterceptors(FileFieldsInterceptor([{ name: 'banner', maxCount: 1 }]))
	createEvent(
		@Param('id') id: number,
		@UploadedFiles() files,
		@Body(new ValidationPipe())dto: EventDto
	) {
		const { banner } = files ? files : { banner: null }
		return this.eventService.createEvent(id, dto, banner && banner[0])
	}

	@Put(':id')
	@Auth()
	@UseInterceptors(FileFieldsInterceptor([{ name: 'banner', maxCount: 1 }, { name: 'preview', maxCount: 1}]))
	updateEventById(
		@UploadedFiles() files: {banner?: Express.Multer.File[], preview?: Express.Multer.File[]},
		@Param('id') id: number,
		@Body(new ValidationPipe()) dto: EventUpdateDto
	) {
		const { banner, preview } = files
		return this.eventService.updateEventById(id, dto, banner && banner[0], preview && preview[0])
	}
	@Delete(':id')
	@HttpCode(204)
	@Auth()
	deleteEventById(@Param('id') id: number) {
		return this.eventService.deleteEventById(id)
	}
}
