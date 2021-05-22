import { Body, Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { query } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  // https://blog.logrocket.com/using-firebase-authentication-in-nestjs-apps/
  // firebase-admin을 이용해 만든 jwt 토큰을 가지고 있어야 접근 가능
  @UseGuards(AuthGuard('jwt'))
  @Get('accessRequiredJwt')
  accessRequiredJwt(){
    console.log('jwt 토큰이 있어야 접근이 가능합니다.')
  }

  // 카카오 로그인 시 리다이렉트
  @Get('kakaoRedirect')
  //@UseGuards(AuthGuard('kakao'))
  async kakaoRedirect(@Req() req, @Body() query){

    console.log('=============================');
    console.log('kakaoRedirect');
    //console.log('req: ', req);
    //console.log('req.body.emailObj: ', req.body.emailObj);
    //console.log('req.emailObj: ', req.emailObj);

   //console.log('query.code: ', query.code);

    return 'here is kakaoRedirect';
  }

  @Get('naverRedirect')
  naverRedirect(@Req() req){
    //console.log(req);
    console.log('naverRedirect');
    return 'here is naversRedirect';

  }


}
