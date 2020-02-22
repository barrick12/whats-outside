import React from 'react';
import VenueList from '../VenueList';
import renderer from 'react-test-renderer';

const defaultProps = {    
  allVenues: [],    
  allVenuesImages: [],      
  isLoading: false,
  searchText: '',    
  currentPage: 0,
  isFirstSearchDone: false,
}

it('renders correctly', () => {
  const tree = renderer.create(<VenueList state={defaultProps}/>).toJSON();
  expect(tree).toMatchSnapshot();
});