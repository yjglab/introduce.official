import { Injectable } from '@nestjs/common';
import { AuthHelpers } from '@shared/helpers/auth.helpers';

@Injectable()
export class UserListener {
  static async onCreated(params, next) {
    if (params.model == 'User') {
      if (params.action === 'create') {
        const email = params.args['data'].email;
        const password = params.args['data'].password;

        // const encryptedEmail = AuthHelpers.encryptCbc(email);
        const hashedPassword = await AuthHelpers.hash(password);
        params.args['data'] = {
          ...params.args['data'],
          email,
          // email: encryptedEmail,
          password: hashedPassword,
        };
      }
    }

    return next(params);
  }
}
