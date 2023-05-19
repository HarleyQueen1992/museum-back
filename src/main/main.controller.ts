import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { MainService } from './main.service'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { MainDto } from './dto/main.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('main')
export class MainController {
	constructor(private readonly mainService: MainService) {}

	@Get()
	async getAll() {
		return this.mainService.getMain()
	}

	@Post()
	@Auth()
	@UseInterceptors(FileFieldsInterceptor([{ name: 'logo', maxCount: 1 }]))
	creaetMain(@UploadedFiles() files, @Body() dto: MainDto) {
		const { logo } = files

		return this.mainService.createMain(dto, logo && logo[0])
	}

	@Put(':id')
	@Auth()
	@UseInterceptors(FileFieldsInterceptor([{ name: 'logo', maxCount: 1 }]))
	async updateMainById(
		@Param('id') id: number,
		@UploadedFiles() files,
		@Body() dto: MainDto
	) {
		const { logo } = files

		return this.mainService.updateFindById(id, dto, logo && logo[0])
	}

	@Delete(':id')
	@Auth()
	deleteMainById(@Param('id') id: number) {
		return this.mainService.deleteFindById(id)
	}
}
