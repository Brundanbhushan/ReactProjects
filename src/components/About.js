import User from "./User";
import UserClass from "./UserClass";

const About = () => {
    return (
        <div className="user-card">
            <h1>About us content here</h1>
            <User name={"Brunda Bhushan"} location={"Mysuru"} />

            <UserClass name={"Brunda Kushal"} location={"hyderabad"} />
        </div>
    );
};

export default About;