import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';
import { debounce } from 'lodash';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      response = await response.json();
      console.log(response.foodCategory, response.food_items);
      
      // Assuming response.foodCategory contains food categories and response.food_items contains food items
      setFoodCat(response.foodCategory);
      setFoodItem(response.food_items);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleSearchChange = debounce((e) => {
    setSearch(e.target.value);
  }, 300); // Adjust the debounce delay as needed

  return (
    <div>
      <div><Navbar /></div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain"}}>
        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{zIndex:"10"}}>
            <div className='d-flex justify-content-center'>
              <input className='form-control me-2' type='search' placeholder='Search' aria-label='Search' onChange={handleSearchChange} />
              {/* <button className='btn btn-outline-success text-white bg-success' type='submit'>Search</button> */}
            </div>
          </div>
          <div className="carousel-item active">
          <img src="https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg" 
              className="d-block w-100" 
              alt="First slide" 
              style={{objectFit: "fill"}}
          />
          </div>
          <div className="carousel-item">
            <img  src="https://assets.winni.in/product/primary/2022/11/77640.jpeg?dpr=1&w=500" 
                  className="d-block w-100" 
                  alt="First slide" 
                  style={{objectFit:"fill"}}
          />
          </div>
          <div className="carousel-item">
            <img  src="https://www.cookforindia.com/wp-content/uploads/2016/02/Momos-snap.jpg" 
                  className="d-block w-100" 
                  alt="First slide" 
                  style={{objectFit:"fill"}}
            />
            <img  src="https://recipesblob.oetker.in/assets/d8a4b00c292a43adbb9f96798e028f01/1272x764/pizza-pollo-arrostojpg.jpg" 
                  className="d-block w-100" 
                  alt="First slide" 
                  style={{objectFit:"fill"}}
            />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className='container'> 
        {foodCat.length !== 0 ? foodCat.map((data) => (
          <div key={data._id} className='mb-3'>
            <div className='fs-3 m-3'>
              {data.CategoryName}
            </div>
            <hr />
            <div className='row'>
              {foodItem.length !== 0 ? foodItem
                .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                .map((filteredItems) => (
                  <div key={filteredItems._id} className='col-12 col-md-6 col-lg-3'>
                    <Card foodItem={filteredItems}
                      options={filteredItems.options[0]}
                    />
                  </div>
                )) : <div>No Such Data Found</div>}
            </div>
          </div>
        )) : ""}
      </div>
      <div><Footer /></div>
    </div>
  );
}
