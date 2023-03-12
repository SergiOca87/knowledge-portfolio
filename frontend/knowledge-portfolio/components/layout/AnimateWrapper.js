import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '../../utils/motion';

const AnimateWrapper = ({ children }) => {
	function HOC() {
		<motion.section
			variants={staggerContainer()}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.25 }}
		>
			{children}
		</motion.section>;
	}
};

export default AnimateWrapper;
