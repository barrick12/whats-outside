import React from 'react';
import Loader from '../Loader';
import renderer from 'react-test-renderer';

const defaultProps = {    
  isLoading: false,  
}

it('renders correctly', () => {
  const tree = renderer.create(<Loader isLoading={defaultProps.isLoading}/>).toJSON();
  expect(tree).toMatchSnapshot();
});