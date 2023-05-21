import { Module } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { ScheduleController } from './schedule.controller'
import { DateOf } from 'src/typeorm/entities/DateOf'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Event } from 'src/typeorm/entities/Event'
import { Time } from 'src/typeorm/entities/Time'

@Module({
	imports: [TypeOrmModule.forFeature([DateOf, Event, Time])],
	controllers: [ScheduleController],
	providers: [ScheduleService]
})
export class ScheduleModule {}
