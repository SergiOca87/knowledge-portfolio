export const fadeInContainer = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.5,
		},
	},
};

export const fadeInItem = {
	hidden: { opacity: 0, y: '50px' },
	show: { opacity: 1, y: '0' },
};
