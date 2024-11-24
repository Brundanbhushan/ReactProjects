import React from "react";

class UserClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            count1: 1
        }
    }

    render() {
        const { name, location } = this.props;

        return (
            <div>
                <h1>count = {this.state.count}</h1>
                <button onClick={() => {
                    this.setState({
                        count: this.state.count + 10
                        ,
                    });
                }
                }>count increase</button>
                <h1>count = {this.state.count1}</h1>
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h3>Email: "brundabhushan@gmail.com"</h3>
            </div>
        )
    }
}

export default UserClass;