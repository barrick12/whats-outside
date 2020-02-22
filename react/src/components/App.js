import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Grid, Row, Col } from 'react-bootstrap';
import Loader from './Loader'
import VenueList from './VenueList'
import HeaderImage from '../assets/anime_question.png'
import Paginate from './Paginate'

class App extends Component {

  state = {
    allVenues: [],    
    allVenuesImages: [],      
    isLoading: false,
    searchText: '',    
    currentPage: 0,
    isFirstSearchDone: false,
  }

  handleOnChange = (e) => { 
    e.preventDefault();
    let value = e.target.value;
    this.setState( (state) => ({ searchText: value }));
  }  

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.setState((state)=>({isLoading: true}));
    fetch('http://localhost:5000/api/getVenues', {
      method: 'POST',        
      headers: {
        'Content-Type': 'application/json',                
      },
      body: JSON.stringify({ location: encodeURI(this.state.searchText) })
    })
    .then( async (res)=>{ 
      res = await res.json();      
      this.setState((state)=>({allVenues: res.venues, allVenuesImages: res.photos, currentPage: 0, isLoading: false, isFirstSearchDone: true}));      
    })
  }
  
  onPageChange = (e) => {        
    const value = Number(e.target.innerText.match(/\d/))-1;        
    if (value != this.state.currentPage)
      this.setState((state)=>({currentPage: value }))    
  }
  
  render() {                  
         
    var result =       
      (      
        <Grid>
          <Row> 
            {/* small widths */}
            <Col xs={12} mdHidden={true} lgHidden={true}>
              <span className='header-container'>
                <h1>What's Nearby?</h1>                
              </span>
            </Col>

            {/* other all other widths */}
            <Col md={12} lg={12} xsHidden={true} smHidden={true}>
              <span className='header-container'>
                <h1>What's Nearby</h1>
                <img
                  src={HeaderImage}          
                  alt={`Header Image`}                
                  className='header-image'
                />
              </span>
            </Col>

          </Row>          
          <Row>                                
          
            {/* small widths */}
            <Col xs={12} mdHidden={true} lgHidden={true}>                          
              <Form>
                <FormGroup>                  
                  <ControlLabel >Wher do you want to search nearby?</ControlLabel>
                    <FormControl 
                      type="text"
                      placeholder="Enter your location here"
                      value={this.state.searchText}
                      disabled={this.state.isLoading}
                      onChange={this.handleOnChange}
                      onKeyPress={(e)=>{if(e.key=='Enter') e.preventDefault();}}
                    />
                    <span className='venue-form-search-btn-sm'>
                      <Button                     
                        disabled={this.state.isLoading}
                        onClick={this.handleOnSubmit}
                        bsClass='venue-panel-search-btn-sm'>
                        <strong>Search</strong>
                      </Button>                      
                    </span>
                </FormGroup>
                
              </Form>              
              <Loader isLoading={this.state.isLoading}/>              
              <VenueList state={this.state} />
              <Paginate state={this.state} size={'large'} onPageChange={this.onPageChange}/>
            </Col>

            {/* other all other widths */}            
            <Col md={2} lg={2} xsHidden={true} smHidden={true}/>
            <Col md={8} lg={8} xsHidden={true} smHidden={true}>
              <Form>
                <FormGroup>
                  
                  <ControlLabel >Where do you want to search nearby?</ControlLabel>

                  <span className='venue-form-search'>
                    <span className='venue-form-search-text'>
                      <FormControl 
                        type="text"
                        placeholder="Enter your location here"
                        value={this.state.searchText}
                        disabled={this.state.isLoading}
                        onChange={this.handleOnChange}
                        onKeyPress={(e)=>{ if(e.key=='Enter') e.preventDefault();}}
                      />
                    </span>

                    <span className='venue-form-search-btn'>
                      <Button                     
                        disabled={this.state.isLoading}
                        onClick={this.handleOnSubmit}
                        bsClass='venue-panel-search-btn'>
                        <strong>Search</strong>
                      </Button>
                    </span>                
                  
                  </span>
                </FormGroup>               
              </Form>
              <Loader isLoading={this.state.isLoading}/>                            
              <VenueList state={this.state} />
              <Paginate state={this.state} size={'medium'} onPageChange={this.onPageChange} />
            </Col>
            <Col md={2} lg={2} xsHidden={true} smHidden={true}/>          
            
          </Row>      
        </Grid>
      )        
    return (result);
  }
}

export default App;