//TODO: USer options should be selected by default (access user options JSON).

import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useContext, useState } from 'react';
import {
	Offcanvas,
	Button,
	Form,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';
import styled from 'styled-components';
import PortfolioOptionsContext from '../context/PortfolioOptionsContext';
import UserContext from '../context/UserContext';

const StyledFormWrap = styled.div``;
const StyledButtonGroup = styled.div``;
const StyledCanvas = styled(Offcanvas)`
	background-color: var(--primary);
	border-right: 3px solid var(--secondary);
`;

const UPDATE_USER_MUTATION = gql`
	mutation UPDATE_USER_MUTATION($id: ID!, $options: JSON) {
		updateUser(id: $id, data: { options: $options }) {
			id
			name
			options
		}
	}
`;

export default function PortfolioEdit({ children }) {
	const { user } = useContext(UserContext);
	const { options, setOptions } = useContext(PortfolioOptionsContext);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	let optionsObject = {
		options: {},
	};

	const [updateUser, { loading, error, data }] = useMutation(
		UPDATE_USER_MUTATION,
		{
			variables: {
				id: user?.id,
				options: optionsObject,
			},
		}
	);

	async function handleSubmit(e) {
		e.preventDefault();

		optionsObject.options = { ...options };
		optionsObject = JSON.stringify(optionsObject);

		const res = await updateUser().then(console.log(user));
	}

	return (
		<>
			<Button variant="primary" onClick={handleShow} className="me-2">
				<FaPencilAlt />
			</Button>
			<StyledCanvas show={show} onHide={handleClose}>
				<Offcanvas.Header closeButton className="secondary-bg">
					<Offcanvas.Title>Portfolio Options</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<StyledFormWrap>
						<Form onSubmit={handleSubmit}>
							<Form.Group controlId="exampleForm.SelectCustom">
								<Form.Label>
									Tile/Text for the public portfolio
								</Form.Label>
								<StyledButtonGroup>
									<OverlayTrigger
										placement="top"
										delay={{ show: 250, hide: 400 }}
										overlay={
											<Tooltip id="button-tooltip">
												Title
											</Tooltip>
										}
									>
										<div className="input-wrap text">
											<label htmlFor="userTitle">
												<span>Portfolio Title</span>
												<input
													type="text"
													name="userTitle"
													value={options.userTitle}
													onChange={(e) =>
														setOptions({
															...options,
															userTitle:
																e.target.value,
														})
													}
												/>
											</label>
										</div>
									</OverlayTrigger>
									<OverlayTrigger
										placement="top"
										delay={{ show: 250, hide: 400 }}
										overlay={
											<Tooltip id="button-tooltip">
												Intro Paragraph
											</Tooltip>
										}
									>
										<div className="input-wrap text">
											<label htmlFor="introText">
												<span>Intro Text</span>
												<textarea
													name="introText"
													value={
														options.userIntroText
													}
													onChange={(e) =>
														setOptions({
															...options,
															userIntroText:
																e.target.value,
														})
													}
												/>
											</label>
										</div>
									</OverlayTrigger>
								</StyledButtonGroup>
							</Form.Group>

							<Form.Group controlId="exampleForm.SelectCustom">
								<Form.Label>Columns</Form.Label>
								<StyledButtonGroup>
									<OverlayTrigger
										placement="top"
										delay={{ show: 250, hide: 400 }}
										overlay={
											<Tooltip id="button-tooltip">
												1 Column
											</Tooltip>
										}
									>
										<Button
											variant="outline-secondary"
											className={
												options.cols === 12
													? 'active'
													: ''
											}
											onClick={(e) =>
												setOptions({
													...options,
													cols: 12,
												})
											}
										>
											<span>1</span>
										</Button>
									</OverlayTrigger>
									<OverlayTrigger
										placement="top"
										delay={{ show: 250, hide: 400 }}
										overlay={
											<Tooltip id="button-tooltip">
												2 Columns
											</Tooltip>
										}
									>
										<Button
											variant="outline-secondary"
											className={
												options.cols === 6
													? 'active'
													: ''
											}
											onClick={(e) =>
												setOptions({
													...options,
													cols: 6,
												})
											}
										>
											<span>2</span>
										</Button>
									</OverlayTrigger>
									<OverlayTrigger
										placement="top"
										delay={{ show: 250, hide: 400 }}
										overlay={
											<Tooltip id="button-tooltip">
												3 Columns
											</Tooltip>
										}
									>
										<Button
											variant="outline-secondary"
											className={
												options.cols === 4
													? 'active'
													: ''
											}
											onClick={(e) =>
												setOptions({
													...options,
													cols: 4,
												})
											}
										>
											<span>3</span>
										</Button>
									</OverlayTrigger>
								</StyledButtonGroup>
							</Form.Group>

							<Form.Group controlId="exampleForm.SelectCustom">
								<Form.Label>Show/Hide User Image</Form.Label>
								<StyledButtonGroup>
									<OverlayTrigger
										placement="top"
										delay={{ show: 250, hide: 400 }}
										overlay={
											<Tooltip id="button-tooltip">
												True
											</Tooltip>
										}
									>
										<Button
											variant="outline-secondary"
											className={
												options.userImage
													? 'active'
													: ''
											}
											onClick={(e) =>
												setOptions({
													...options,
													userImage: true,
												})
											}
										>
											<span>True</span>
										</Button>
									</OverlayTrigger>
									<OverlayTrigger
										placement="top"
										delay={{ show: 250, hide: 400 }}
										overlay={
											<Tooltip id="button-tooltip">
												False
											</Tooltip>
										}
									>
										<Button
											variant="outline-secondary"
											className={
												options.userImage === false
													? 'active'
													: ''
											}
											onClick={(e) =>
												setOptions({
													...options,
													userImage: false,
												})
											}
										>
											<span>False</span>
										</Button>
									</OverlayTrigger>
								</StyledButtonGroup>
							</Form.Group>

							<Form.Group controlId="exampleForm.SelectCustom">
								<Form.Label>Round Edges</Form.Label>
								<StyledButtonGroup>
									<OverlayTrigger
										placement="top"
										delay={{ show: 250, hide: 400 }}
										overlay={
											<Tooltip id="button-tooltip">
												True
											</Tooltip>
										}
									>
										<Button
											variant="outline-secondary"
											className={
												options.roundEdges
													? 'active'
													: ''
											}
											onClick={(e) =>
												setOptions({
													...options,
													roundEdges: true,
												})
											}
										>
											<span>True</span>
										</Button>
									</OverlayTrigger>
									<OverlayTrigger
										placement="top"
										delay={{ show: 250, hide: 400 }}
										overlay={
											<Tooltip id="button-tooltip">
												False
											</Tooltip>
										}
									>
										<Button
											variant="outline-secondary"
											className={
												options.roundEdges === false
													? 'active'
													: ''
											}
											onClick={(e) =>
												setOptions({
													...options,
													roundEdges: false,
												})
											}
										>
											<span>False</span>
										</Button>
									</OverlayTrigger>
								</StyledButtonGroup>
							</Form.Group>

							<Form.Group controlId="exampleForm.SelectCustom">
								<Form.Label>Font Family</Form.Label>
								<StyledButtonGroup>
									<OverlayTrigger
										placement="top"
										delay={{ show: 250, hide: 400 }}
										overlay={
											<Tooltip id="button-tooltip">
												Montserrat
											</Tooltip>
										}
									>
										<Button
											variant="outline-secondary"
											className={
												options.fontFamily ===
												'Montserrat'
													? 'active'
													: ''
											}
											onClick={(e) =>
												setOptions({
													...options,
													fontFamily: 'Montserrat',
												})
											}
										>
											<span className="montserrat">
												Aa
											</span>
										</Button>
									</OverlayTrigger>
									<OverlayTrigger
										placement="top"
										delay={{ show: 250, hide: 400 }}
										overlay={
											<Tooltip id="button-tooltip">
												Open Sans
											</Tooltip>
										}
									>
										<Button
											variant="outline-secondary"
											className={
												options.fontFamily === 'Roboto'
													? 'active'
													: ''
											}
											onClick={(e) =>
												setOptions({
													...options,
													fontFamily: 'Roboto',
												})
											}
										>
											<span className="roboto">Aa</span>
										</Button>
									</OverlayTrigger>
								</StyledButtonGroup>
							</Form.Group>

							<Form.Group controlId="exampleForm.SelectCustom">
								<Form.Label>Mode</Form.Label>
								<StyledButtonGroup>
									<OverlayTrigger
										placement="top"
										delay={{ show: 250, hide: 400 }}
										overlay={
											<Tooltip id="button-tooltip">
												Dark Mode
											</Tooltip>
										}
									>
										<Button
											variant="outline-secondary"
											className={
												options.mode === 'dark'
													? 'active'
													: ''
											}
											onClick={(e) =>
												setOptions({
													...options,
													mode: 'dark',
												})
											}
										>
											<span>Dark</span>
										</Button>
									</OverlayTrigger>
									<OverlayTrigger
										placement="top"
										delay={{ show: 250, hide: 400 }}
										overlay={
											<Tooltip id="button-tooltip">
												Light Mode
											</Tooltip>
										}
									>
										<Button
											variant="outline-secondary"
											className={
												options.mode === 'light'
													? 'active'
													: ''
											}
											onClick={(e) =>
												setOptions({
													...options,
													mode: 'light',
												})
											}
										>
											<span>Light</span>
										</Button>
									</OverlayTrigger>
								</StyledButtonGroup>
							</Form.Group>

							<Form.Group controlId="exampleForm.SelectCustom">
								<Form.Label>
									{options.mode} Mode Color Palette
								</Form.Label>
								{options.mode === 'dark' && (
									<StyledButtonGroup>
										<OverlayTrigger
											placement="top"
											delay={{ show: 250, hide: 400 }}
											overlay={
												<Tooltip id="button-tooltip">
													1
												</Tooltip>
											}
										>
											<Button
												variant="outline-secondary"
												className={
													options.darkPalette ===
													options.palettes
														.darkPalette1
														? 'active'
														: ''
												}
												onClick={(e) =>
													setOptions({
														...options,
														darkPalette:
															options.palettes
																.darkPalette1,
													})
												}
											>
												<span>Palette 1</span>
											</Button>
										</OverlayTrigger>
										<OverlayTrigger
											placement="top"
											delay={{ show: 250, hide: 400 }}
											overlay={
												<Tooltip id="button-tooltip">
													2
												</Tooltip>
											}
										>
											<Button
												variant="outline-secondary"
												className={
													options.darkPalette ===
													options.palettes
														.darkPalette2
														? 'active'
														: ''
												}
												onClick={(e) =>
													setOptions({
														...options,
														darkPalette:
															options.palettes
																.darkPalette2,
													})
												}
											>
												<span>Palette 2</span>
											</Button>
										</OverlayTrigger>
									</StyledButtonGroup>
								)}

								{options.mode === 'light' && (
									<StyledButtonGroup>
										<OverlayTrigger
											placement="top"
											delay={{ show: 250, hide: 400 }}
											overlay={
												<Tooltip id="button-tooltip">
													1
												</Tooltip>
											}
										>
											<Button
												variant="outline-secondary"
												className={
													options.lightPalette ===
													options.palettes
														.lightPalette1
														? 'active'
														: ''
												}
												onClick={(e) =>
													setOptions({
														...options,
														lightPalette:
															options.palettes
																.lightPalette1,
													})
												}
											>
												<span>Palette 1</span>
											</Button>
										</OverlayTrigger>
										<OverlayTrigger
											placement="top"
											delay={{ show: 250, hide: 400 }}
											overlay={
												<Tooltip id="button-tooltip">
													2
												</Tooltip>
											}
										>
											<Button
												variant="outline-secondary"
												className={
													options.lightPalette ===
													options.palettes
														.lightPalette2
														? 'active'
														: ''
												}
												onClick={(e) =>
													setOptions({
														...options,
														lightPalette:
															options.palettes
																.lightPalette2,
													})
												}
											>
												<span>Palette 2</span>
											</Button>
										</OverlayTrigger>
									</StyledButtonGroup>
								)}
							</Form.Group>
							{/* <Form.Group controlId="formBasicRange">
								<Form.Label>Font Size</Form.Label>
								<OverlayTrigger
									placement="right"
									delay={{ show: 250, hide: 400 }}
									overlay={
										<Tooltip id="button-tooltip">
											{`${options.fontSize}px`}
										</Tooltip>
									}
								>
									<Form.Control
										type="range"
										min="12"
										max="60"
										onChange={(e) =>
											setOptions({
												...options,
												fontSize: e.target.value,
											})
										}
									/>
								</OverlayTrigger>
							</Form.Group> */}
							<input type="submit" value="Save Changes" />
						</Form>
					</StyledFormWrap>
				</Offcanvas.Body>
			</StyledCanvas>
		</>
	);
}
