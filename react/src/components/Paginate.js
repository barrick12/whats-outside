import React from 'react'
import { Pagination } from 'react-bootstrap';

export default function Paginate(props){    
  
  let pages = Math.floor(props.state.allVenues.length / 5);
  let paginationItems = [];

  for(var i=0;i<pages;i++){
    paginationItems.push(<Pagination.Item key={i} active={i === props.state.currentPage} onClick={props.onPageChange}>{i+1}</Pagination.Item>)
  }
  console.log("ismobile??", props.isMobile);
  var result =  
    props.state.allVenues.length >0 && props.state.isLoading == false ? 
    (<span className={ props.isMobile ? 'paginate-mobile' : ''}>
      <Pagination 
      bsSize ={props.size}       
      >                
        {paginationItems}
      </Pagination>
    </span>)    
    : null; 
  
  return (result);

}