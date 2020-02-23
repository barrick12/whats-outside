var bodyParser = require('body-parser');
var cors = require('cors');
var configValues = require('../config/config.json');
var fetch = require('node-fetch');

var corsOptions = {
  origin: configValues.originUrl,
  optionsSuccessStatus: 200
}

module.exports = function(app) {

  var jsonParser = bodyParser.json();
  app.options('/api/*', cors(corsOptions));

  app.post('/api/getVenues', cors(corsOptions), jsonParser, async function(req,res) {
    
    let venues='';    

    try {
      const responseSearch = await fetch(`https://api.foursquare.com/v2/venues/search?client_id=${configValues.clientId}&client_secret=${configValues.clientSecret}&limit=10&near=${req.body.location}&intent=browse&radius=2000&v=20180323`, 
      { 
        method: 'GET',
        cache: 'no-cache',            
      });
      venues = await responseSearch.json();                       

      if(venues != null && typeof venues != undefined && venues.meta.code == 200) {
        venues = venues.response.venues.map((e)=>({ id: e.id, location: e.location, name: e.name }));
        var result = await Promise.all( venues.map( async (element) => {
         
          const responsePhoto = await fetch(`https://api.foursquare.com/v2/venues/${element.id}/photos?client_id=${configValues.clientId}&client_secret=${configValues.clientSecret}&limit=1&v=20180323`, 
          { 
            method: 'GET',
            cache: 'no-cache',
          });
          if (responsePhoto.status == 200) {
            let json = await responsePhoto.json();
            let photoArr = json.response.photos.items;
            if(photoArr != null && typeof photoArr != undefined && photoArr.length > 0) {
              return {id: `${element.id}`, url: `${photoArr[0].prefix}100x100${photoArr[0].suffix}`};                            
            }
            else 
              return {id: `${element.id}`, url: ''};
          }
          else 
            return {id: `${element.id}`, url: ''};
          
        }       
        ))
        return res.status(200).send(JSON.stringify({venues, photos: result}));
      };
      

    }
    catch(error) {
      console.error("/api/getVenues error:", error);
      return res.status(500).send(`Error calling /api/getVenues: ${err}`);
    }    
        
    res.status(200).send(JSON.stringify({venues: [], photos: []}));

    }
  )

}