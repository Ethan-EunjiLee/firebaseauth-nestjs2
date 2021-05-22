import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
       // private readonly authService: AuthService,
    ){
        super({
            usernameField: 'id',
            passwordField: 'pw'
        });
    }

    // auth로부터 넘어온 user확인하여 값이 없으면 예외, 있으면 user값을 전달
    async validate(id: string, pw: string):Promise<any>{

        console.log('localstrategy id:', id);
        console.log('localstrategy pw:', pw);

        //const user = await this.authService.validateUser(id, pw);
        //console.log('validator user: ', user);
        
        // const user = await this.authService.validateUser(id, pw);
       
        // console.log('localstrategy validate() user: ', user);
        // if(!user){
        //     console.log('validate');
        //     throw new UnauthorizedException();
        // }
        // console.log('validator user: ', user);

        const user = {id, pw}
         return user;
    }
}
