import { Module } from '@nestjs/common'
import { MainService } from './main.service'
import { MainController } from './main.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Main } from 'src/typeorm/entities/main'
import { FileService } from 'src/file/file.service'

@Module({
	imports: [TypeOrmModule.forFeature([Main])],
	controllers: [MainController],
	providers: [MainService, FileService]
})
export class MainModule {}
