const { Text, Relationship } = require('@keystonejs/fields');

// TODO: Add icon

module.exports = {
	fields: {
		title: {
			type: Text,
			isRequired: true,
		},
		user: {
			type: Relationship,
			ref: 'User.categories',
			many: false,
			isRequired: true,
		},
	},
};
