import axios from "axios"
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export default function PostRequest() {
    current_session = cookie.get("session")

    axios.post('http://localhost:9001/list', {
        session: current_session
    })
    .then((response) => {
        console.log(response);

        // do somthing here, still need help displaying the filenames
        alert("it worked")
    })
    .catch((error) => {
        console.log(error);
    });
}