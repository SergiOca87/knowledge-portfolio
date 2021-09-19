import React from 'react';
import styled from 'styled-components';
import { useCombobox, resetIdCounter } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useLazyQuery } from '@apollo/client';

const StyledSearch = styled.div``;

const StyledDropdown = styled.div`
	width: 100%;
	z-index: 10;
	border: 1px solid var(--lightGrey);

	.dropdown-item {
		z-index: 10;
		border-bottom: 1px solid var(--lightGrey);
		background: ${(props) => (props.highlighted ? '#f7f7f7' : 'white')};
		padding: 1rem;
		transition: all 0.2s;
		${(props) => (props.highlighted ? 'padding-left: 2rem;' : null)};
		display: flex;
		align-items: center;
		border-left: 10px solid
			${(props) => (props.highlighted ? props.theme.lightgrey : 'white')};
		img {
			margin-right: 10px;
		}

		&:hover {
			color: red;
		}
	}
`;

const SEARCH_ITEMS_QUERY = gql`
	query SEARCH_ITEMS_QUERY($searchTerm: String!) {
		searchTerms: allItems(
			where: {
				OR: [
					{ title_contains_i: $searchTerm }
					{ description_contains_i: $searchTerm }
				]
			}
		) {
			id
			title
		}
	}
`;

export default function Search() {
	const [findItems, { loading, data, error }] = useLazyQuery(
		SEARCH_ITEMS_QUERY,
		{
			//Bypass apollo cache and always go to the network
			// We don't want to store any result
			fetchPolicy: 'no-cache',
		}
	);

	const items = data?.searchTerms || [];

	console.log('data', data);

	//A way to throttle a function that would make a network request on every key stroke otherwise
	const findItemsThrottled = debounce(findItems, 350);

	resetIdCounter();
	const {
		isOpen,
		inputValue,
		getMenuProps,
		getInputProps,
		getComboboxProps,
		getItemProps,
		highlightedIndex,
	} = useCombobox({
		items: items,

		//When someone types into the box
		onInputValueChange() {
			console.log('inout value', inputValue);
			findItemsThrottled({
				variables: {
					searchTerm: inputValue,
				},
			});
		},

		//When Someone select a dropdown option
		//TODO: Decide what to do here, redirect to single page if it has it via the id?
		onSelectedItemChange({ selectedItem }) {
			console.log('selecteditem', selectedItem);
		},

		itemToString: (item) => item?.title || '',
	});
	return (
		<>
			<StyledSearch>
				<div {...getComboboxProps()}>
					<input
						{...getInputProps({
							type: 'search',
							placeholder: 'Search by name',
							id: 'search',
							className: 'loading',
						})}
					/>
				</div>
			</StyledSearch>
			<StyledDropdown {...getMenuProps()}>
				{console.log(data)}
				{isOpen &&
					items.map((item, index) => {
						return (
							<div
								className="dropdown-item"
								key={item.id}
								{...getItemProps({ item })}
								highlighted={index === highlightedIndex}
							>
								{item.title}
							</div>
						);
					})}
				{isOpen && !items.length && !loading && (
					<div>Sorry, no items found for ${inputValue}</div>
				)}
			</StyledDropdown>
		</>
	);
}
