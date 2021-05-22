import { BadRequestException, UseGuards } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { request } from "express";
import passport from "passport";
import { Strategy, VerifyFunction } from "passport-naver";
import { UserService } from "src/user/user.service";

export class NaverStrategy{
    constructor(){
        this.init();
    }

    init(){
        console.log('init naver');
        passport.use(new Strategy({
            clientID: 'VFOZLgZkAL5XCeFnJErb',
            clientSecret: '798UvW1t8F',
            callbackURL: 'http://localhost:3001/naverRedirect'
        }, (accessToken, refreshToken, profile, done) => {
            const _profile = profile._json;
            console.log('naver profile: ', profile);
            return done(null, _profile);
        }))
    }
}
/*
export class NaverStrategy extends PassportStrategy(Strategy, 'naver'){

    constructor(){
        super({
            clientID: 'VFOZLgZkAL5XCeFnJErb',
            clientSecret: '798UvW1t8F',
            callbackURL: 'http://localhost:3001/naverRedirect'
        },)
    }

    // async validate(accessToken: string, refreshToken: string, profile: any, done: Function){
    //     console.log('profile: ', profile);
    //     done(null, profile);
    // }

    // authenticate(accessToken: string, refreshToken: string, profile: any, done: Function){
    //     console.log('authenticateion');
    //     console.log(profile);
    //     return this.success(profile);
    // }

    validate(accessToken: string, refreshToken: string, profile: any){
        
        const {displayName} = profile
        const user = {
            displayName
        }
        console.log('user: ',user);
        return user;
    }


}
*/