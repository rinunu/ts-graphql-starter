import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-custom';
import { getAuth } from 'firebase-admin/auth';
import { ExtractJwt } from 'passport-jwt';
import invariant from 'invariant';
import { AuthService } from './auth.service';
import { SentryService } from '@backend/sentry';

const extractJwt = ExtractJwt.fromAuthHeaderAsBearerToken();

/**
 * firebase のユーザー ID から、 User を取得する
 *
 * User が存在しない場合は、新規作成する
 */
@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor(
    private authService: AuthService,
    private sentryService: SentryService
  ) {
    super((async (req, done) => {
      const jwt = extractJwt(req);
      if (!jwt) {
        return done(null, null);
      }

      const decodedToken = await getAuth().verifyIdToken(jwt);

      const uid = decodedToken.uid;
      invariant(uid, 'uid is required');

      const user = await authService.setupUser({
        firebaseUserId: uid,
        // サンプルのため、メアドを使用する
        initialName: decodedToken.email ?? '',
      });

      sentryService.setUser(user);

      done(null, user);
    }) as VerifyCallback);
  }
}
