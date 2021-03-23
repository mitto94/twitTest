import { authService } from "fbInstance";
import {react, useState} from "react";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                //Creatrconst
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                // Log In
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log("data", data);
        } catch (error) {
            setError(error.message);
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev)
    return (
        <>
        <form onSubmit={onSubmit} className="container">
                <input className="authInput" onChange={onChange} name="email" type="text" placeholder="Email" required value={email}></input>
                <input className="authInput" onChange={onChange} name="password" type="password" placeholder="Password" required value={password}></input>
                <input className="authInput authSubmit" type="submit" value={newAccount ? "Create Account" : "Sign In" }></input>
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sign In" : "Create Account"}</span>
        </>
    )
}

export default AuthForm;
