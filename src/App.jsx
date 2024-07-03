import NavBar from './components/navbar/NavBar'
import Listings from './Listings.json'
import { Container} from '@mui/material'
import React, { useState } from 'react';


import './App.css'

function App(){


  const[selectedListing, setSelectedListing] =useState(null);
  const[isPopupVisible, setPopupVisible] = useState(false);
  //add to favarite
  const [favourites, setFavourites] = useState([]);
  const [state,setState] = useState(1)

  //search
  const [searchType, setSearchType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minbedrooms, setMinBedrooms] = useState('');
  const [maxbedrooms, setMaxBedrooms] = useState('');

   //popup
  const showPopup = (Listing) =>{
    setSelectedListing(Listing);
    setPopupVisible(true);
  };

  const closePopup = () =>{
    setSelectedListing(null);
    setPopupVisible(false);
  };
//add to favarite
const addToFavourites = (listing) => {
  // Check if the property is already in favourites
  if (!favourites.some((favourite) => favourite.id === listing.id)) {
    setFavourites((prevFavourites) => [...prevFavourites, listing]);
  } else {
    alert('This property is already in your favourites.');
  }
};
//remove Favourite
  const removeFavourite = (id) =>{
    setFavourites((prevFavourites) => prevFavourites.filter((favourite) => favourite.id !== id));
  };
//clear Favourite
  const clearFavourites = () => {
    setFavourites([]);
  };


  //search
  const handleSearch = () => {
    return Listings.filter((listing) => {
      const matchesType =
        !searchType || listing.type.toLowerCase() === searchType.toLowerCase();
      
      const withinPriceRange =
        (!minPrice || listing.price >= parseInt(minPrice, 10)) &&
        (!maxPrice || listing.price <= parseInt(maxPrice, 10));
      const withinBedroomsRange =
        (!minbedrooms || listing.bedrooms >= parseInt(minbedrooms, 10)) &&
        (!maxbedrooms || listing.bedrooms <= parseInt(maxbedrooms, 10));
  
      return matchesType && withinPriceRange && withinBedroomsRange;
    });
  };
  
  const filteredListings = handleSearch();


  const action = (index) =>{

    setState(index)
  };

  

  return (                             
    <>
      <NavBar/>
        
       {/* searchForm */}
       <div className='hero'>
        <div className='content'>
      
            <h1>Find the perfect home..!</h1>
            <p className='search-text'>Search properties here.... </p>
            <form className='search'>
            <div className='search-bar'>
              <input 
                type='text' 
                 placeholder='Type' 
                value={searchType} 
                onChange={(e) => setSearchType(e.target.value)} 
              />
              <input 
                type='number'
                placeholder='Min Price'
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type='number'
                placeholder='Max Price'
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            <input
                type='number'
                placeholder='Min Bedroooms'
                value={minbedrooms}
                onChange={(e)=> setMinBedrooms(e.target.value)}
              />
            
            <input
                type='number'
                placeholder='Max Bedroooms'
                value={maxbedrooms}
                onChange={(e)=> setMaxBedrooms(e.target.value)}
              />


            </div>
            </form>

        </div>

       </div>

       
       <header> <h1 className='propertyList'>Properties List</h1></header>
        <div id='Main-Container'>
          {/* property List container */}
           <Container maxWidth='lg' className='properties'>
                <div className='App'>
      
                {filteredListings.map((Listing) => {
                return(
                <div className='box '>
                    <img src={ Listing.picture}/>
                  
                  <br/>

                  {Listing.caption}
                  <div className='property-info'>
                     <p>Type: {Listing.type}</p>
                     <p>Bedroom: {Listing.bedrooms}</p>
                     <p>Price: {Listing.price}</p>
                     <button onClick={() => showPopup(Listing)}>View details</button>
                      {/* add to fav  */}
                     <br/>
                     <button className='favourites-none'
                     onClick={() => addToFavourites(Listing)}>
                      Add to favourites
                     </button>

                  </div>
                      
                </div>
                 );
                })}
                {/* Pop-up */}

            {isPopupVisible && selectedListing && (
              <div className='popup'>
                <div className='popup-content'>
                  <span className='close' onClick={closePopup}>
                    &times;
                  </span>
                  <div className='popup-image'>
                  <img src={selectedListing.picture} alt={selectedListing.picture}/>
                  </div>

                  <div className='popup-text'>
                  <p>Type:{selectedListing.type}</p>
                  
                  <p>Bedroom:{selectedListing.bedrooms}</p>
                  
                  <p>Price:{selectedListing.price}</p><br/>
                  </div>
                  
                  
                  {/* TABS */}
                  <div className="App-one">
                   <div className="tab-box">
                     <div className="tabs">
                           <div onClick={() => action(1)} className={`tab ${state === 1 ? 'active-tab' : ''}`}>
                            Floor plan
                      </div>
                      <div onClick={() => action(2)} className={`tab ${state === 2 ? 'active-tab' : ''}`}>
                        Google Map
                      </div>
                      <div onClick={() => action(3)} className={`tab ${state === 3 ? 'active-tab' : ''}`}>
                        Description
                      </div>
                    </div>
                    {/* contents */}

                    <br/>
                    <br/>
                    <div className="contents">
                      <div className={`content ${state === 1 ? 'active-content' : ''}`}>
                      <h2>FloorPlan</h2>
                      <div className='floorPlan-image'>
                      <img src={selectedListing.floorPlan} alt={selectedListing.floorPlan}/>
                      </div>
                      </div>

                      <div className={`content ${state === 2 ? 'active-content' : ''}`}>
                        <div className='map'>
                        
                        </div>
                      </div>

                      <div className={`content ${state === 3 ? 'active-content' : ''}`}>
                      <h2 className='description-topic'>Description</h2>
                       <p className='tab-description'>{selectedListing.description}</p>
                      </div>

                    </div>
                   </div>
                  </div>
                  
                </div>
              </div>
              )}

               </div>
            </Container>
          
             {/*  favourites */}
               <Container  maxWidth='lg' className='favourites' >
                <h1 className='fav'>Favourites</h1>
                <button onClick={clearFavourites} className='clear-favourites-button'>
                  Clear All Favourites
                </button>
                 {favourites.map((favourite) => (
                  <div key={favourite.id} className='favourite-item'>
                    <div className='favourite-image'>
                    <img src={favourite.picture} alt={favourite.caption}/>
                    </div>
                    <p>Type:{favourite.type}</p>
                  
                    <p>Bedroom:{favourite.bedrooms}</p>
                  
                    <p>Price:{favourite.price}</p>
                    <button onClick={() => removeFavourite (favourite.id)}>Remove</button>
                  </div>

                 )
                 
                 
                 
                 )}
              </Container>
        
        </div>
             </>
             );

}

export default App;



