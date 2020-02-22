import React from 'react';
import Venue from './Venue';

export default function VenueList(props){

  const itemsPerPage = 5;    
  let startIndex = props.state.currentPage * itemsPerPage;
  let endIndex = props.state.allVenues == 0 ? 0 : props.state.currentPage * itemsPerPage + itemsPerPage - 1;    

  var venueList= props.state.isLoading == false && props.state.isFirstSearchDone ? (      
    <ul>              
      { 
        props.state.allVenues.length == 0 ? (<span className='misc-text'><strong>No data.</strong></span>) :
        props.state.allVenues.map((v, index)=>{
          if(index < startIndex || index > endIndex ) return;
          let image = props.state.allVenuesImages.filter(e=>e.id == v.id);            
          let imageUrl = '';
          if(image!= null && typeof image != undefined && image.length == 1) imageUrl = image[0].url;            
          let address = '';
          if( v.location.formattedAddress.length >= 2 )
            address = v.location.formattedAddress[0] + ", " + v.location.formattedAddress[1];
          else 
            address = v.location.formattedAddress[0];
          return (<li key={v.id}>
            <Venue venueImage={imageUrl}
              venueName={v.name}
              venueAddress={address}
              linkToAddress={`http://maps.google.com/?q=${v.location.lat},${v.location.lng}`}
              />
          </li>)}
        )
      }
    </ul>
  )
  : props.state.isLoading == false && props.state.isFirstSearchDone == false && (<span className='misc-text'><strong>Nothing to show yet.</strong></span>);

  return(venueList);

}