import React from "react";
import ReactDOM from "react-dom/client";

// create react element using react
const heading = React.createElement("h1", {id: 'head'}, "heading 1");
console.log(heading);

// JSX - HTML like or XML like syntax
const jsxHeading = <h1 id="head" className="header" tabIndex={2}>{heading} heading 1</h1>;
console.log(jsxHeading);

//React functional component - contatined js arrow function
const HeadingComponent = () => {
    return <h1>react functional component</h1>;
}

//other way to write the above function
const HeadingComponent1 = () => <h1>react functional componentww</h1>;

// Component Composition
const HeadingComponent3 = () => (
    <div id="container">
        {jsxHeading}
        <h1>{100 + 200}</h1>
        {HeadingComponent1()}
        <HeadingComponent />
        <p>Sub heading functional componenet</p>
    </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

// render the react functional componenet
root.render(<HeadingComponent3 />);



