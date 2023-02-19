import { Link } from "react-router-dom";
import ('./NotFound.css')

const  NotFound= () => {
    return (
        <div className="not-found">
            <Link to = "/">
            <h2>Sorry!</h2>
            <p>The page cannot be found</p>
            Back to home page</Link>
        </div>
    );
}

export default NotFound;