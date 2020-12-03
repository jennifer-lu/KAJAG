import axios from "axios"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
// Alice told me to send post request with json that has
// session: [session key (in cookie)]

// the following code probably doesn't currently work


export default function PostRequest() {
    // get current session from cookies
    current_session = cookie.get("session")

    axios.post('http://localhost:9001/list', {
        session: current_session
    })
    .then((response) => {
        console.log(response);
        alert("Signed in ")
    })
    .catch((error) => {
        console.log(error);
    });
}

