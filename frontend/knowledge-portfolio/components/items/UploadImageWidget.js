import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

function UploadImageWidget({ setMainImage }) {
	//TODO: Can any of this be an initialprop?
	//TODO: It's better to change this to a signed upload (more secure)

	//TODO: This works, need to extract image info on result to add relationships, user to image and to be able to load the image afterwards
	const cloudinaryRef = useRef();
	const widgetRef = useRef();

	useEffect(() => {
		if (typeof window !== 'undefined' && window.cloudinary) {
			cloudinaryRef.current = window.cloudinary;
			widgetRef.current = cloudinaryRef.current.createUploadWidget(
				{
					cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
					uploadPreset: 'tczpsuv3',
					multiple: false,
				},
				function (error, result) {
					if (error) {
						toast.error(error);
					}

					if (result.event === 'success') {
						// This is submitting my main form

						setMainImage({
							imageName: result.info.original_filename,
							imageUrl: result.info.url,
						});
					}
				}
			);
		}
	}, []);

	return (
		<button onClick={() => widgetRef.current.open()}>Upload Image</button>
	);
}

export default UploadImageWidget;
