import { Module } from '@nestjs/common'
import { NewsService } from './news.service'
import { NewsController } from './news.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { News } from 'src/typeorm/entities/News'
import { FileModule } from 'src/file/file.module'

@Module({
	imports: [TypeOrmModule.forFeature([News]), FileModule],
	controllers: [NewsController],
	providers: [NewsService]
})
export class NewsModule {}
