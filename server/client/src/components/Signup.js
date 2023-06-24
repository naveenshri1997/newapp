import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Signup = () => {
    const history = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        work: '',
        password: '',
        cpassword: '',
    })
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    }

    const PostData = async (e) => {
        e.preventDefault();
        const {name,email,phone,work,password,cpassword} = user;
        const res = await fetch("/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,email,phone,work,password,cpassword
            })
        });
        const data = await res.json();
        if(res.status === 422| !data){
            window.alert("invalid registration");
            console.log("invalid registration");
        }else{
            window.alert("registration done");
            console.log("registration done");
            history('/login');
        }
    }
    return (
        <>
            <section>
                <div className="container mt-4 ">
                    <div className='row justify-content-md-center'>
                        <div className='col-md-4 shadow-sm p-3 mb-5 bg-body-tertiary rounded'>

                            <form method='POST' id='register-form'>
                                <div class="mb-3">
                                    <input type="text" name='name' id='name' autoComplete='off' placeholder='Your Name' class="form-control" value={user.name} onChange={handleInputs} />
                                </div>
                                <div class="mb-3">
                                    <input type="email" name='email' id='email' autoComplete='off' placeholder='Your email' class="form-control" value={user.email} onChange={handleInputs} />
                                </div>
                                <div class="mb-3">
                                    <input type="number" name='phone' id='phone' autoComplete='off' placeholder='Your phone' class="form-control" value={user.phone} onChange={handleInputs} />
                                </div>
                                <div class="mb-3">
                                    <input type="text" name='work' id='work' autoComplete='off' placeholder='Your work' class="form-control" value={user.work} onChange={handleInputs} />
                                </div>
                                <div class="mb-3">
                                    <input type="password" name='password' id='password' autoComplete='off' placeholder='Your password' class="form-control" value={user.password} onChange={handleInputs} />
                                </div>
                                <div class="mb-3">
                                    <input type="cpassword" name='cpassword' id='cpassword' autoComplete='off' placeholder='Confirm Your password' class="form-control" value={user.cpassword} onChange={handleInputs} />
                                </div>
                                <div class="mb-3 form-check">
                                </div>
                                <center>

                                    <input type="submit" name="sign" id='sign' value='register' class="btn btn-primary" onClick={PostData} />
                                    <br />
                                    <NavLink to="/login" > I am already register</NavLink>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup