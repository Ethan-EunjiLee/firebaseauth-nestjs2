// Nest
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// passport & strategy
import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao'
//fireabse-admin
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});

  // firebase-admin
  const firebase_params_ServiceAccount = {
    projectId: "fir-auth-bea2a",
    clientEmail: "firebase-adminsdk-6j7ak@fir-auth-bea2a.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC0aqkS9wI6tBTk\nCck8qKXrN8+NpgG1vwHOD90fCdLDJ9HbRZ+M71cS+1uVP0EnyPuuYjhpfX5K3JrV\n4mDwFe5COZ2+pp2S7XM05RbhIc4celJch3KdY+/M1msm+kb0VTnVja60HwX0LLG9\nrkm+Yovih1VirP/cQ9y9as5t4H3tY8jzr8VbwM5PhEq6ezaBr27qnshZZJvmK9lA\nJ/g6anbXGaucc6JyUPQoZpHaRwDoCZakEqfNIIYpyWA7wCYc7WwImxu1/ciL9wSp\nGOx/PmFH86lUlpcA/mmPv67uNIVo+Lvar2Xl6HPTTb2J/9j+oso9Ju5/Amk+nAdZ\nw+ziVFf7AgMBAAECggEAI+YvU1s8IdMwbvm1hbDnJuk5ju1v3KqvoMGOVb0+J1/2\nhYOSjlgXgurqG8X04IZA8j+QCwmSBjJkStfbQxqSCLJvPX7oztIZwPYuuchgu1Dp\nr4iyGThIAIHP23ckhDyrH9+r2iJsLFxyV5RlDxGL1RzptBNJbBpCw5wLjFiFpiUE\nzPaMPIaWVlLVCDq55D8F+B4cYdH3VSQIE947rDDOmgy+BqYAZoCfMIxsBb2aYz5P\nDgBy09ViyWlm89g6eKETCv1/mhNBM1t1pHrEiPWB7By9iiZnJBikt+zi8pokEoI2\nCEDG+l+WVCxhdtuTMKd4tUaJYyenehUu/Ji+TtvkLQKBgQD6wZ62VzvIczS8u5WV\nw7mK1OdXVeMmxrdI2ANGJ6eZQ7qHsqCxylSyoerI2DVER7hEMu65e3idSlqDfugb\nuaRJs5+AnGDtRzbfBNv87KwUodptaf9v28K8GYiu4FmTC9avCeWn1/TzmfH8dArG\nUcDYbvD/+DyNwSqaVMNwS0iQtQKBgQC4MH1C+thNCPplx7LtlrWu3K07t2sYOeax\n/2eyJz8nh23ctp2XabSCmWfguCVOepexoJa6OOCQE0PxAIJJF69rOJ1xeIMz+D6t\n+ygd4MLynjal+c5C+4Bj5wr10RNS77GQEfUX37Vu2u2wgyyoWTil8iaHJSL0nPy3\noc0aoOqj7wKBgHsmQAYZDXlCazINhkdJGoR+TydrPOW8TiNuQx1fOEZjJuah6Z2n\nWrVoI+CDnpVsC6kiwm9BnljRPWa7Gs8S+wZfOwR0yH1/rgkVX9z1dwWi/50go5yR\n9y9d8uy/rf4zoDnSyIEH5HsGrftoGiqP1//zbFSp20NbDMtCucEamAbJAoGAc8tA\nJIiwzRVU3gHC0i0KQUlIux8fe9aC2upXVZ/oy0AP6E8CGfuBWQ16ScNa6NCXZzsv\nJxm0y77g2rVYMv1p8b1g9cIusdBiD1yzJr1zsbWXY5b9fgzA9Y19zXZIcL5x4cH4\nVK72UB/giDSfMaMNwv3ODO5i4GeFVSiqWhBKEw8CgYAHF4wCVNHhwKPiT3bj88iP\nYsI89xJp0P5Iu+sb547dOeocr1w+5XpheG3MU8TToogPqiiebLFdlCYNYej6lFgi\nS9+/arcP/28gmyFJ4v9Xl8ss8BeYZyhbca6j6u0IgjJrcOXkZcgeZquVdkO0C5ux\n4PrZnmgWbNaRQ9JNiK/hLA==\n-----END PRIVATE KEY-----\n"
  }
  // firebase-admin ?????????
  if(!admin.apps.length){
    admin.initializeApp({
      credential: admin.credential.cert(firebase_params_ServiceAccount),
      databaseURL: 'https://fir-auth-bea2a-default-rtdb.firebaseio.com',
      serviceAccountId:'106710747811478638404@fir-auth-bea2a.iam.gserviceaccount.com'
    })
  }
  
  // passport-kakao ... test
  passport.use(new KakaoStrategy({
    clientID: '974d06dc1d9c335cc6d0fcd94ee7703a', // Rest API ???
    clientSecret: 'nywcIy2P3jLbAwRkq4XG2rI6eVCEX5Kf',
    callbackURL: 'http://localhost:3001/kakaoRedirect'// ??????????????? URL
  },(accessToken, refreshToken, profile, done) => {
    const profile_json = profile._json;
    console.log('josn????????? ??????: ',profile_json);
    done(null, profile_json);
  }));

  await app.listen(3001);
}
bootstrap();


