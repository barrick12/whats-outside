import React from 'react';
import Paginate from '../Paginate';
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
  const tree = renderer.create(<Paginate state={defaultProps} size={'medium'}/>).toJSON();
  expect(tree).toMatchSnapshot();
});