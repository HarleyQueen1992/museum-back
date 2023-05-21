import { Module } from '@nestjs/common'
import { TimeService } from './time.service'
import { TimeController } from './time.controller'
import { Time } from 'src/typeorm/entities/Time'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DateOf } from 'src/typeorm/entities/DateOf'

@Module({
	imports: [TypeOrmModule.forFeature([Time, DateOf])],
	controllers: [TimeController],
	providers: [TimeService]
})
export class TimeModule {}
