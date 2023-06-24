import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
const Login = () => {

    const { state, dispatch } = useContext(UserContext);
    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({
                email,
                password
            })
        });
        const data = await res.json();
        console.log("this is data", data);
        if (res.status === 400 | !data) {
            window.alert("invalid login");
        } else {
            dispatch({type:'USER',payload:true})
            window.alert("login sucess");
            history('/');
        }
    }
    return (
        <>
            <section>
                <div className="container mt-4 ">
                    <div className='row justify-content-md-center'>
                        <div className='col-md-4 shadow-sm p-3 mb-5 bg-body-tertiary rounded'>
                            <form method="POST">

                                <div className="mb-3">
                                    <input type="email" name='email' id='email' autoComplete='off' placeholder='Your email' className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <input type="password" name='password' id='password' autoComplete='off' placeholder='Your password' className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mb-3 form-check">
                                </div>
                                <center>
                                    <input type="submit" name="login" id='login' value='login' className="btn btn-primary" onClick={loginUser} />
                                    <br />
                                    <NavLink to="/signup" > New User</NavLink>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login