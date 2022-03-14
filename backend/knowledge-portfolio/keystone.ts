
import 'dotenv/config';
import { config } from '@keystone-6/core';
import { withAuth, session } from './auth';
import { lists } from './schema';
import type { DatabaseConfig } from '@keystone-6/core/types';
import { sendPasswordResetEmail } from './mail';

// let sessionSecret = process.env.SESSION_SECRET;

// if (!sessionSecret) {
//   if (process.env.NODE_ENV === 'production') {
//     throw new Error(
//       'The SESSION_SECRET environment variable must be set in production'
//     );
//   } else {
//     sessionSecret = sessionSecret;
//   }
// }

// const { withAuth } = createAuth({
//   listKey: 'User',
//   identityField: 'email',
//   secretField: 'password',
//   sessionData: 'id name email',
//   initFirstItem: {
//     fields: ['email', 'password'],
//     itemData: { isAdmin: true },
//     skipKeystoneWelcome: false,
//   },
//   passwordResetLink: {
//    async sendToken(args) {
//      await sendPasswordResetEmail(args.token, args.identity);
//    }
//   },
//   // magicAuthLink: {
//   //   sendToken: async ({ itemId, identity, token, context }) => { /* ... */ },
//   //   tokensValidForMins: 60,
//   // },
// });

export default config(
  withAuth({
    session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true
      }
    },
    db: {
      provider: 'postgresql',
      // adapter: 'prisma_postgresql',
      url: process.env.DATABASE_URL
    },
    ui: {
      //Users should not have UI access
      isAccessAllowed: (context) => !!context.session?.data,
    },
    images: {
      upload: 'local',
      local: {
        storagePath: 'public/images',
        baseUrl: '/images',
      },
    },
    lists,
  }),
);
