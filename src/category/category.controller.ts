import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	ValidationPipe
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	getCategory() {
		return this.categoryService.findAll()
	}

	@Post()
	@Auth()
	createCategory(@Body(new ValidationPipe()) dto: CategoryDto) {
		return this.categoryService.createCategory(dto)
	}

	@Delete(':id')
	@Auth()
	deleteCategoryById(@Param('id') id: number) {
		return this.categoryService.deleteCategoryById(id)
	}
}
