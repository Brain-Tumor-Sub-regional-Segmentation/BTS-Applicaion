import {useState} from "react";
import {useNavigate} from 'react-router-dom'

import {auth} from "../../config/firebase-config"
import {signInWithEmailAndPassword} from "firebase/auth"

const LoginPage = () => {
    let navigate = useNavigate();
    let [user, setUser] = useState({email: "", password: ""});

    let onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(userCredentials => {
                console.log(userCredentials.user.email);
                console.log("Logged in Successfully!");
                navigate("/patients")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    let changeField = (e) => {setUser({...user, [e.target.name]: e.target.value});}

    return <div>
        <form className="login-form">
            <label htmlFor="email">Email address</label>
            <input id="email"
                   type="email"
                   name="email"
                   placeholder="Enter email"
                   required
                   onChange={changeField}
            />

            <label htmlFor="password">Password</label>
            <input id="password"
                   type="password"
                   name="password"
                   placeholder="Enter password"
                   required
                   onChange={changeField}
            />

            <button type="submit" onClick={onLogin}>Login</button>
        </form>
    </div>
}

export default LoginPage;