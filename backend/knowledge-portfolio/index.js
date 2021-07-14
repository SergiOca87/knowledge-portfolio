const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const {
	Text,
	Checkbox,
	Password,
	Relationship,
} = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const initialiseData = require('./initial-data');
const dotenv = require('dotenv').config();
('');
// Schemas
const ItemSchema = require('./lists/Item.js');
const CategorySchema = require('./lists/Category.js');

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const PROJECT_NAME = 'knowledge-portfolio';
const adapterConfig = {
	mongoUri: process.env.MONGO_URI,
};

const keystone = new Keystone({
	adapter: new Adapter(adapterConfig),
	onConnect: process.env.CREATE_TABLES !== 'true' && initialiseData,
	cookieSecret: process.env.COOKIE_SECRET,
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) =>
	Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
	if (!user) {
		return false;
	}

	// Instead of a boolean, you can return a GraphQL query:
	// https://www.keystonejs.com/api/access-control#graphqlwhere
	return { id: user.id };
};

const userIsAdminOrOwner = (auth) => {
	const isAdmin = access.userIsAdmin(auth);
	const isOwner = access.userOwnsItem(auth);
	return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

keystone.createList('User', {
	fields: {
		name: { type: Text },
		email: {
			type: Text,
			isUnique: true,
		},
		isAdmin: {
			type: Checkbox,
			// Field-level access controls
			// Here, we set more restrictive field access so a non-admin cannot make themselves admin.
			access: {
				update: access.userIsAdmin,
			},
		},
		password: {
			type: Password,
		},
		items: {
			type: Relationship,
			ref: 'Item.user',
			many: true,
		},
		categories: {
			type: Relationship,
			ref: 'Category.user',
			many: true,
		},
	},
	// List-level access controls
	access: {
		read: access.userIsAdminOrOwner,
		update: access.userIsAdminOrOwner,
		create: access.userIsAdmin,
		delete: access.userIsAdmin,
		auth: true,
	},
});

const authStrategy = keystone.createAuthStrategy({
	type: PasswordAuthStrategy,
	list: 'User',
	config: { protectIdentities: process.env.NODE_ENV === 'production' },
});

keystone.createList('Item', ItemSchema);
keystone.createList('Category', CategorySchema);

module.exports = {
	keystone,
	apps: [
		new GraphQLApp(),
		new AdminUIApp({
			name: PROJECT_NAME,
			enableDefaultRoute: true,
			authStrategy,
			isAccessAllowed: userIsAdmin,
		}),
	],
};
