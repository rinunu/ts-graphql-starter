import { Module } from '@nestjs/common';
import { FirebaseStrategy } from './firebase.strategy';
import { initializeFirebaseAdmin } from './firebase';
import { GqlAuthGuard } from './gql-auth.guard';
import { AuthService } from './auth.service';
import { CommonModule } from '@backend/common';
import { UserModule } from '@backend/user';
import { DbModule } from '@backend/db';

initializeFirebaseAdmin();

@Module({
  imports: [CommonModule, UserModule, DbModule],
  providers: [GqlAuthGuard, FirebaseStrategy, AuthService],
})
export class FirebaseAuthModule {}
