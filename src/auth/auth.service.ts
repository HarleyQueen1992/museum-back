import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(private jwt: JwtService) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const tokens = this.issueToken(user.login)
		return { ...tokens }
	}
	async getNewTokens(refreshToken: string) {
		try {
			const result = await this.jwt.verifyAsync(refreshToken)

			const tokens = this.issueToken(result.login)

			return { ...tokens }
		} catch {
			throw new UnauthorizedException('Invalid refresh token')
		}
	}

	private issueToken(login: string) {
		const data = {
			login: login
		}

		const accesToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '30d'
		})

		return { accesToken, refreshToken }
	}

	private async validateUser(dto: AuthDto) {
		if (process.env.LOGIN !== dto.login)
			throw new NotFoundException('User not found')
		if (process.env.PASSWORD !== dto.password)
			throw new NotFoundException('Invalid password')
		return dto
	}
}
