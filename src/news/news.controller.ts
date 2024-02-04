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
import { NewsService } from './news.service'
import { QueryDto } from './dto/query.dto'
import { NewsDto } from './dto/news.dto'
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer'
import { NewsUpdateDto } from './dto/news-update.dto'

@Controller('news')
export class NewsController {
	constructor(private readonly newsService: NewsService) {}

	@Get()
	findAll(@Query() param: QueryDto) {
		return this.newsService.pagination(param)
	}

	@Get(':id')
	findById(@Param('id') id: number) {
		return this.newsService.findById(id)
	}

	@Post()
	@UseInterceptors(FileFieldsInterceptor([{ name: 'banner', maxCount: 1 }]))
	createaNews(@Body() dto: NewsDto, @UploadedFiles() files) {
		const { banner } = files ? files : { banner: null }
		return this.newsService.createNews(dto, banner && banner[0])
	}

	@Put(':id')
	//@Auth()
	@UseInterceptors(FileFieldsInterceptor([{ name: 'banner', maxCount: 1 }]))
	updateNewsById(
		@UploadedFiles() files,
		@Param('id') id: number,
		@Body(new ValidationPipe()) dto: NewsUpdateDto
	) {
		const { banner } = files ? files : { banner: null }

		return this.newsService.updateNewsById(id, dto, banner && banner[0])
	}

	@Delete(':id')
	@HttpCode(204)
	//@Auth()
	deleteNewsById(@Param('id') id: number) {
		return this.newsService.deleteNewsById(id)
	}
}
