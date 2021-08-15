
import 'dotenv/config';
import { config } from '@keystone-next/keystone/schema';
import { statelessSessions } from '@keystone-next/keystone/session';
import { createAuth } from '@keystone-next/auth';
import { lists } from './schema';

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'The SESSION_SECRET environment variable must be set in production'
    );
  } else {
    sessionSecret = sessionSecret;
  }
}

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'name',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});




export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true
      }
    },
    db: {
      adapter: 'prisma_postgresql',
      url: process.env.DATABASE_URL
    },
    ui: {
      //Users should not have UI access
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session: sessionConfig
  })

);
