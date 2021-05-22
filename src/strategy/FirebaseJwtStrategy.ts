import { Injectable} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-firebase-jwt';
import { ExtractJwt } from "passport-jwt";
import * as admin from 'firebase-admin';


// https://blog.logrocket.com/using-firebase-authentication-in-nestjs-apps/
// firebase-auth: AuthGuard에서 Strategy 호출할 때 사용할 이름
@Injectable()
export class FirebaseJwtStrategy extends PassportStrategy(Strategy,'firebase-auth'){
    constructor(){
        super({
            // Request로부터 jwt 추출
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    // 토큰 확인
    // async validate(token: string){
    //     admin.auth().
    // }
} 