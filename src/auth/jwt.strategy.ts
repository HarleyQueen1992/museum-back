import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly ConfigService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: ConfigService.get('JWT_SECRET')
		})
	}

	async validate({ login }): Promise<any> {
		if (process.env.LOGIN !== login) {
			throw new UnauthorizedException()
		}
		return { login }
	}
}
