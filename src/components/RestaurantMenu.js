import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API_URL } from "../utils/constants";

const RestaurantMenu = () => {

    const [listofMenu, setlistofMenu] = useState(null);

    useEffect(() => {
        restaurantfetchdata();
    }, []);
    
    const { resID } = useParams();

    const restaurantfetchdata = async () => 
    {
        const data = await fetch(MENU_API_URL+resID);
        const json = await data.json();
        setlistofMenu(json.data);
    }
    if (listofMenu === null) return <Shimmer />;

    const {name, costForTwoMessage, cuisines} = listofMenu?.cards[2]?.card?.card?.info;
    
    let { itemCards } = listofMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards[2].card.card;
    return (
        <div>
            <div>
                <h1>{name}</h1>
                <p>{cuisines.join(', ')}</p>
                <p>{costForTwoMessage}</p>
                <p>{cuisines}</p>
            </div>
            <div>
                Menu
                <ul>
                    {itemCards.map(item => <li key={item.card.info.id}>
                        {item.card.info.name} - {" Rs. "}
                        {item.card.info.finalPrice / 100 || item.card.info.price / 100 }</li>)}    
                </ul>
            </div>



        </div>  
        
    );
};

export default RestaurantMenu;