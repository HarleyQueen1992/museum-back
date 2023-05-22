import { Module } from '@nestjs/common'
import { BookingService } from './booking.service'
import { BookingController } from './booking.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Booking } from 'src/typeorm/entities/Booking'
import { Ticket } from 'src/typeorm/entities/Ticket'
import { Time } from 'src/typeorm/entities/Time'

@Module({
	imports: [TypeOrmModule.forFeature([Booking, Ticket, Time])],
	controllers: [BookingController],
	providers: [BookingService]
})
export class BookingModule {}
