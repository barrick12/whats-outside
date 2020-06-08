import React from 'react'
import { Panel, Button, Label } from 'react-bootstrap'

export default function Venue(props){    
  
  console.log("Venue isMobile? ", props.isMobile);

  return(
    <Panel>
      <Panel.Body className={!props.isMobile ? 'venue-panel' : 'venue-panel-mobile' }>
      { !props.isMobile ?
          props.venueImage === '' ?
          (<Label bsStyle="default" style={{marginRight: '10px', display: 'flex', alignItems: 'center' }}>No Image Available</Label>)
          :(<img
            src={props.venueImage}          
            alt={`Venue Image`}
            className='venue-image'
            />)
        : null        
      }
        <span className={'venue-text venue-text-container ' + (props.isMobile ? 'venue-text-sm-mobile' : '' )}>
          
          <strong>{props.venueName}</strong>
          {props.venueAddress}
          
          { !props.isMobile ?
            <Button bsClass='venue-panel-btn' onClick={(e)=>{e.preventDefault();window.open(props.linkToAddress,"_blank"); }}>
                <b>Google Maps</b>
              </Button>
            : null
          }
        </span>       
        { props.isMobile ?
          <Button bsClass='venue-panel-btn-mobile' onClick={(e)=>{e.preventDefault();window.open(props.linkToAddress,"_blank"); }}>
            <b>Google Maps</b>
          </Button>
          : null
        }
      </Panel.Body>
    </Panel>
  );

}
