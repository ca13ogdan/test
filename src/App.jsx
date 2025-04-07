import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import './App.css'
import image from '../src/assets/image.jpeg'


function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  //Get API data
  useEffect(() => {
    fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft')
      .then(response => response.json())  
      .then(data => {
        setData(data);  
        setLoading(false); 
      })
      .catch(error => {
        setError(error);  
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
        <Typography
          variant="h3"
          align="center"
          sx={{ marginTop: '20px', fontWeight: 'bold' }}
        >
          Choose Your Skip Size 
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ marginTop: '8px', color: '#606060' }}
        >
          Select the skip size that best suits your needs
        </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ padding: '20px', marginBottom:'3%' }}
      >
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '300px',
                width: '300px',
                border: selectedItem?.id === item.id ? '2px solid #00e600' : '2px solid #404040',
                fontSize: '20px',
                borderRadius: '10px',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                opacity: 0.7,
                cursor: item.price_before_vat ? 'pointer' : 'not-allowed',
                flexDirection: 'column',
                textAlign: 'center',
                position:'relative',
                opacity: item.price_before_vat ? 1 : 0.6
              }}
              onClick={() => item.price_before_vat &&  setSelectedItem(item)}
            >
              <Typography
                variant="h4"
                color="white"
                fontSize="13px"
                sx={{
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px',
                  color:'yellow',
                  background:'black',
                  padding:'1%'
                }}
              >
                {item.allowed_on_road ? '' : '! Private Property Only'}
              </Typography>
              <Typography variant="h4" color="white">
                {item.size}  Yards
              </Typography>
              <Typography variant="h6" color="white" fontSize="10px" >
                {item.hire_period_days} {item.hire_period_days > 1 ? 'days' : 'day'} hire period
              </Typography>
              
            </Box>  
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'2% 0'}}>
              <Typography variant="h6" 
                sx={{
                  textAlign:'center',
                  backgroundColor: item.price_before_vat ? 'green' : 'gray',
                  borderRadius:10,
                  width:'50%',
                  cursor: item.price_before_vat ? 'pointer' : 'not-allowed',
                  opacity: item.price_before_vat ? 1 : 0.6
                }}
                onClick={() => item.price_before_vat && setSelectedItem(item)}
              >
                £{(item.price_before_vat + (item.price_before_vat * item.vat / 100)).toFixed(2)}  <span style={{ fontSize: '0.6em' }}>/ week</span>
              </Typography>   
            </Box>
            
          </Grid>
        ))}
      </Grid>
      {selectedItem?.id && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#333',
            color: '#fff',
            textAlign: 'center',
            padding: '10px',
            fontSize: '16px',
            boxShadow: '0 -2px 5px rgba(0,0,0,0.2)'
          }}
        >
          <Typography variant="body1">
            Selected Skip ID: {selectedItem?.id}
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default App
