import {
	Body,
	Controller,
	Get,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { Auth } from './decorators/auth.decorator'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@UsePipes(new ValidationPipe())
	async login(@Body() dto: AuthDto) {
		return this.authService.login(dto)
	}

	@Post('token')
	@UsePipes(new ValidationPipe())
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return this.authService.getNewTokens(dto.refreshToken)
	}
}
