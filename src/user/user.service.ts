import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    User = {
        email: 'dkwo595@naver.com'
    }

    // 일치여부 확인
    findOne(email){
        if(email===this.User.email){
            return true;
        }
        return false;
    }
}
