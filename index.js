

//   const headings = document.createElement("h1");
//   headings.innerHTML="hello";
//   document.getElementById("root").appendChild(headings);


const parent = React.createElement(
    "div",
    { id: "parent" },
    React.createElement("div", { id: "child" }, [
        React.createElement("h1", { id: "heading" }, "headning1"),
        React.createElement("h2", { id: "heading2" }, "heading2"),
        React.createElement("p", { id: "para" }, "paragraph")
    ]));

console.log(parent);
    
    // const heading = React.createElement("p", {id: "paragraph", class: "name"}, "hello Brunda!");
    const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);


  