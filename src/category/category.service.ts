import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from 'src/typeorm/entities/Category'
import { Repository } from 'typeorm'
import { CategoryDto } from './dto/category.dto'

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category) private categoryRepository: Repository<Category>
	) {}

	async findAll() {
		return await this.categoryRepository.find()
	}

	async createCategory(dto: CategoryDto) {
		return await this.categoryRepository.save({ ...dto })
	}

	async deleteCategoryById(id: number) {
		return await this.categoryRepository.delete({ id })
	}
}
