const {
	Text,
	Checkbox,
	DateTime,
	// File,
	Relationship,
	Url,
} = require('@keystonejs/fields');

// TODO: Add Data and Relationship after Category is created

module.exports = {
	fields: {
		title: {
			type: Text,
			isRequired: true,
		},
		description: {
			type: Text,
			isRequired: false,
		},
		// date: {
		// 	type: DateTime,
		// 	isRequired: false,
		// },
		// image: {
		// 	type: File,
		// 	isRequired: false,
		// },
		category: {
			type: Relationship,
			ref: 'Category',
			many: true,
			isRequired: false,
		},
		url: {
			type: Url,
			isRequired: false,
		},
		user: {
			type: Relationship,
			ref: 'User.items',
			many: false,
		},
		completed: {
			type: Checkbox,
			isRequired: false,
		},
	},
	labelField: 'title',
};
