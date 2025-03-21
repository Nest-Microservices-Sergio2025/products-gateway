import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NAST_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { CurrentUser } from './interfaces/current-user.interface';
import { Token } from './decorators/token.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(NAST_SERVICE) private readonly client: ClientProxy
    ) { }

    @Post('register')
    async registerUser(@Body() registerUserDto: RegisterUserDto) {

        try {

            const product = await firstValueFrom(
                this.client.send('auth.register.user', registerUserDto)
            )

            return product

        } catch (error) {

            throw new RpcException(error)

        }
    }


    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto) {
        return this.client.send('auth.login.user', loginUserDto).pipe(
            catchError(err => {
                throw new RpcException(err)
            })
        )
    }

    @UseGuards(AuthGuard)
    @Post('verify')
    verifyTToken( @User() user: CurrentUser, @Token() token: string) {

        //const user = req['user']
        //const token = req['token']

        //return { user, token}
        //console.log(req.headers);

        return {user, token}

        return this.client.send('auth.verify.user', {})
    }
}
