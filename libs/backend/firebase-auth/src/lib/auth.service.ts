import { Injectable } from '@nestjs/common';
import { PrismaService } from '@backend/db';
import { User, UserService } from '@backend/user';
import invariant from 'invariant';
import { TimeService } from '@backend/common';

interface SetupUser {
  firebaseUserId: string;
  initialName: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private timeService: TimeService
  ) {}

  async setupUser(params: SetupUser): Promise<User> {
    const now = this.timeService.now();
    const currentFbUser = await this.prisma.firebaseUser.findUnique({
      where: {
        firebaseUserId: params.firebaseUserId,
      },
    });

    if (currentFbUser) {
      const user = await this.userService.findById(currentFbUser?.userId);
      invariant(user, `user not found: ${currentFbUser?.userId}`);
      return user;
    }

    // user => fbUser の順番にすることで、不整合が起きないようにしている
    // 途中で失敗すると user にゴミはできる
    const newUser = await this.userService.createUser({
      name: params.initialName,
    });

    const newFbUser = await this.prisma.firebaseUser.create({
      data: {
        userId: newUser.id,
        firebaseUserId: params.firebaseUserId,
        createdAt: now,
      },
    });
    console.log('create user', newFbUser);

    return newUser;
  }
}
