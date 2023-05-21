import { Module } from '@nestjs/common'
import { EventService } from './event.service'
import { EventController } from './event.controller'
import { Event } from 'src/typeorm/entities/Event'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileService } from 'src/file/file.service'
import { Audience } from 'src/typeorm/entities/Audience'
import { Category } from 'src/typeorm/entities/Category'

@Module({
	imports: [TypeOrmModule.forFeature([Event, Audience, Category])],
	controllers: [EventController],
	providers: [EventService, FileService]
})
export class EventModule {}
