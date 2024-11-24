import ResturantCard from './ResturantCard';    
import { useState, useEffect } from 'react';
import Shimmer from './Shimmer';
import { RESTAURANTS_DATA_API } from '../utils/constants';
const Body = () => {

    const [listofresturant, setlistofresturant] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [searchText, setsearchText] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(RESTAURANTS_DATA_API);
        const json = await data.json();
        setlistofresturant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setfilteredData(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    
    };
    //conditional rendering
    if(listofresturant.length===0)
    {
        return <Shimmer />;
    }

    return (
        <div className="body">
            <div className="filter">
                <input type="text" className="searchbox" value={searchText}
                    onChange={(e) => {
                        setsearchText(e.target.value);  
                    }} />
                
                <button onClick={() => {
                    const filterRest = listofresturant.filter(
                        res => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                        setfilteredData(filterRest);
                }}>search</button>

                <button className='filter_btn'
                    onClick={() => {
                        const filterdata = listofresturant.filter(res => res.info.avgRating > 4.5);
                        setlistofresturant(filterdata);
                    }}
                > Top resturant</button>
            </div>

            <div className="res-main-container">
            <div className="res-conatiner">
                {
                    filteredData.map((resturant) => (
                        <ResturantCard key={resturant.info.id} resData={resturant} />
                    ))
                }     
                </div>
            </div>
        </div>
    )
};

export default Body;