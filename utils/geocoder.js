const http = require('http');

// custom geoCode function
function geocode(addr){
    return new Promise((resolve, reject) => {
      http.get(`${process.env.GEOCODER_GET_URL}${addr}`, (response) => {
        let chunks_of_data = "";
  
        response.on('data', (fragments) => {
          chunks_of_data+=fragments;
        });
  
        response.on('end', () => {       
            let locNew = JSON.parse(chunks_of_data).results[0];
            // promise resolved on success
            resolve({
                      type : 'Point',
                      coordinates: [locNew.locations[0].latLng.lng,locNew.locations[0].latLng.lat],
                      formattedAddress: locNew.providedLocation.location,
                      street: locNew.locations[0].street,
                      city: locNew.locations[0].adminArea5,
                      state: locNew.locations[0].adminArea3,
                      zipcode: locNew.locations[0].postalCode,
                      country: locNew.locations[0].adminArea1
                    })
        });
  
        response.on('error', (error) => {
          // promise rejected on error
          reject(error);
        });
      });
  })
  
  }

module.exports = geocode;