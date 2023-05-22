import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	ValidationPipe
} from '@nestjs/common'
import { BookingService } from './booking.service'
import { BookingDto } from './dto/booking.dto'

@Controller('booking')
export class BookingController {
	constructor(private readonly bookingService: BookingService) {}

	@Get(':id')
	findBookingById(@Param('id') id: number) {
		return this.bookingService.findBookingById(id)
	}

	@Post()
	createBooking(@Body(new ValidationPipe()) dto: BookingDto) {
		return this.bookingService.createBooking(dto)
	}
}
