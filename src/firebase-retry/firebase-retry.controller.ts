// Nestjs
import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
//fireabse-admin
import * as admin from 'firebase-admin';
import { FirebaseUserInfoDto } from 'src/dto/FirebaseUserInfo.Dto';
import { FirebaseRetryService } from './firebase-retry.service';
// etc
import { json } from 'express';
@Controller('firebase-retry')
export class FirebaseRetryController {

    // 회원가입은 프론트 구현 안했고, 로그인만 html로 구현

    constructor(
        private readonly firebaseRetryService: FirebaseRetryService
    ){}

    // firebase auth를 이용해 유저 등록
    // 로그인 후 토큰 부여
    // 넘어오는 값 email, pw
    @Post('signup')
    async firebaseSignup(@Body() userInfo:FirebaseUserInfoDto, @Res() res){
        console.log('firebase-retry/signup');
        console.log('signup userInfo: ', userInfo);
        // 회원가입 처리 후 성공하면 true, 실패하면 false 반환
        const isSignUp = await this.firebaseRetryService.signup(userInfo);
        console.log('Controller isSignup: ', isSignUp);
        if(isSignUp){
            console.log('회원가입 성공');
            // token 발급
            const token = await this.firebaseRetryService.giveToken(userInfo.email);
            console.log('token: ', token);
            // 회원가입 성공한 경우 response 201
            res.status = 201;
            res.send(JSON.stringify({
                'token' : token,
                'signup' : 'success'
            }));

        } else {
            console.log('회원가입 실패');
            // 회원가입 실패한 경우 response 404
            res.statusCode = 404;
            res.send(JSON.stringify('signup Fail'));
        }
    }

    // 프론트(main.html)에서 로그인 성공한 경우 custom token 전달
    // 넘어오는 값: email
    @Post('giveCustomToken')
    async giveCustomToken(@Body() email, @Res() res){
        console.log('giveCustomToken body(email): ', email);        

        // 입력받은 email을 이용해 token 생성(토큰 생성 못한 경우 false 리턴)
        const token = await this.firebaseRetryService.giveToken(email.email);

        if(token===false){
            console.log('토큰 생성 실패');
            res.send('토큰 생성 실패');
        }else{
            console.log('토큰 생성 성공');
            // 토큰 전달
            res.send(JSON.stringify({token}));
        }
    }
}
