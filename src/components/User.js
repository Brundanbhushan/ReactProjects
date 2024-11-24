import { useState } from "react";

/* Functional based component */
const User = (props) => {

    const [count] = useState(0);
    const [count2] = useState(1);
    return (
        <div>
            <h1>count = {count}</h1>
            <h1>count = {count2}</h1>
            <h2>Name: {props.name}</h2>
            <h3>Location: {props.location}</h3>
            <h3>Email: "brundabhushan@gmail.com"</h3>
        </div>
    )
}

export default User;