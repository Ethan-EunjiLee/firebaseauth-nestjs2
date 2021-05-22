import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    @Get('kakao')
    @UseGuards(AuthGuard('kakao'))
    kakaologin(@Req() req){
        //console.log(passport.authenticate('kakao'));
        return 'kakaologin';
    }

    @Get('naver')
    @UseGuards(AuthGuard('naver'))
    naverlogin(){
        return 'naverlogin'
    }

    @Get('local')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req){        
      console.log('------------------------', req.user);
      //const user = req
      return 'locallogin';
    }
}
