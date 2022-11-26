import { useState } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

const StyledDropZone = styled.div`
	width: 30rem;
	height: 10rem;
	border: 1px solid #000;
`;

function DragDropFile({ setMainImage }) {
	// const [file, setFile] = useState(null);
	//TODO: Use DragEnter and DragLeave to style the dropzone

	const dragenter_handler = (ev) => {
		console.log(ev);
		ev.preventDefault();
	};

	const dragover_handler = (ev) => {
		console.log(ev);
		ev.preventDefault();
		ev.dataTransfer.dropEffect = 'move';
	};

	const drop_handler = (ev) => {
		console.log(
			'drop event',
			typeof ev.dataTransfer.files[0],
			ev.dataTransfer.files[0]
		);
		ev.preventDefault();
		ev.stopPropagation();
		setMainImage(ev.dataTransfer.files[0]);
	};

	const handleFileChange = (ev) => {
		setMainImage(ev.target.files[0]);
	};

	return (
		<StyledDropZone
			onDragEnter={(ev) => dragenter_handler(ev)}
			onDrop={(ev) => drop_handler(ev)}
			onDragOver={(ev) => dragover_handler(ev)}
		>
			<Form.Group className="mb-5">
				<Form.Label htmlFor="title">Main Image</Form.Label>
				<Form.Control
					type="file"
					name="mainImage"
					id="mainImage"
					// value={file}
					onChange={(ev) => handleFileChange(ev)}
				/>
			</Form.Group>
		</StyledDropZone>
	);
}

export default DragDropFile;
