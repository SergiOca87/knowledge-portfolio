import { useEffect, useRef } from 'react';

function UploadImageWidget() {
	//TODO: Can any of this be an initialprop?
	//TODO: It's better to change this to a signed upload (more secure)

	//TODO: This works, need to extract image info on result to add relationships, user to image and to be able to load the image afterwards
	const cloudinaryRef = useRef();
	const widgetRef = useRef();

	useEffect(() => {
		cloudinaryRef.current = window.cloudinary;
		widgetRef.current = cloudinaryRef.current.createUploadWidget(
			{
				cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
				uploadPreset: 'tczpsuv3',
				maxFiles: 1,
			},
			function (error, result) {
				console.log('cloudinary result', result);
			}
		);
	}, []);

	return (
		<button onClick={() => widgetRef.current.open()}>Upload Image</button>
	);
}

export default UploadImageWidget;
