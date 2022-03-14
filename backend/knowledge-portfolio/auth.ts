import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    itemData: { isAdmin: true },
  },
});

let sessionSecret = process.env.SESSION_SECRET;
let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
  secure: true,
  path: '/',
  domain: 'localhost',
  sameSite: 'lax',
});

export { withAuth, session }