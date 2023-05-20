import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	ValidationPipe
} from '@nestjs/common'
import { AudienceService } from './audience.service'
import { AudienceDto } from './dto/audience.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('audience')
export class AudienceController {
	constructor(private readonly audienceService: AudienceService) {}

	@Get()
	findAll() {
		return this.audienceService.findAll()
	}

	@Post()
	@Auth()
	createAudience(@Body(new ValidationPipe()) dto: AudienceDto) {
		return this.audienceService.createAudience(dto)
	}

	@Put(':id')
	@Auth()
	updateAudienceById(
		@Param('id') id: number,
		@Body(new ValidationPipe()) dto: AudienceDto
	) {
		return this.audienceService.updateAudienceById(id, dto)
	}

	@Delete(':id')
	@Auth()
	deleteAudienceById(@Param('id') id: number) {
		return this.audienceService.deleteAudienceById(id)
	}
}
