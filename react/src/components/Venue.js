import React from 'react'
import { Panel, Button } from 'react-bootstrap'

export default function Venue(props){    
  
  return(
    <Panel>
      <Panel.Body className='venue-panel'>      
        <img
          src={props.venueImage}          
          alt={`Venue image`}
          className='venue-image'
        />        
        <span className='venue-text venue-text-container'>
          <strong>{props.venueName}</strong>
          {props.venueAddress}
          <Button bsClass='venue-panel-btn' onClick={(e)=>{e.preventDefault();window.open(props.linkToAddress,"_blank"); }}>
            <b>Google Maps</b>
          </Button>          
        </span>       
        
      </Panel.Body>
    </Panel>
  );

}
