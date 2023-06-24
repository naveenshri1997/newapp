import React, { useEffect, useState } from 'react'
const Contact = () => {
    // const history = useNavigate();
    const [userData, setuserData] = useState({ name: "", email: "", phone: "", message: "" });
    const userContact = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            setuserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
            console.log("thisis user", userData.name);
            if (!res.status === 200) {
                const err = new Error(res.error);
                throw err;
            }
        } catch (error) {
            console.log(error);
            // history('/login');
        }
    }
    useEffect(() => {
        userContact();
    }, [])

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setuserData({ ...userData, [name]: value });
    }

    const contactForm = async (e) => {
        e.preventDefault();
        const { name, email, phone, message } = userData;
        const res = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // database name: value name
                name, email, phone, message
            })
        });
        const data = await res.json();

        if(!data){
            console.log("message not send");
        }else{
            alert("Messae Send Sucessfully");
            setuserData({ ...userData, message:""});
        }
    }
    return (
        <>
            <div className='container-fluid'>
                <div className='row  justify-content-md-center'>
                    <div className='col-lg-8'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div class="card mt-4 shadow-sm bg-body-tertiary rounded" >
                                    <div class="card-body">
                                        <h5 class="card-title">Phone</h5>
                                        <p class="card-text">+91 4543535543</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div class="card mt-4 shadow-sm bg-body-tertiary rounded" >
                                    <div class="card-body">
                                        <h5 class="card-title">Phone</h5>
                                        <p class="card-text">+91 4543535543</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div class="card mt-4 shadow-sm bg-body-tertiary rounded" >
                                    <div class="card-body">
                                        <h5 class="card-title">Phone</h5>
                                        <p class="card-text">+91 4543535543</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-5 mt-4 shadow-sm bg-body-tertiary rounded'>
                        <form method='Post' id="contact_form" className='mt-4'>
                            <div class="mb-3">
                                <input type="text" value={userData.name} onChange={handleInputs} name='name' id='contact_name' autoComplete='off' placeholder='Your Name' class="form-control" />
                            </div>
                            <div class="mb-3">
                                <input type="email" value={userData.email} onChange={handleInputs} name='email' id='contact_email' autoComplete='off' placeholder='Your email' class="form-control" />
                            </div>
                            <div class="mb-3">
                                <input type="number" value={userData.phone} onChange={handleInputs} name='phone' id='contact_phone' autoComplete='off' placeholder='Your phone' class="form-control" />
                            </div>
                            <div class="mb-3">
                                <textarea type="text" value={userData.message} onChange={handleInputs} name='message' id='contact_query' autoComplete='off' placeholder='Message' class="form-control" ></textarea>
                            </div>
                            <div class="mb-3 form-check">
                            </div>
                            <center>
                                <button type="submit" onClick={contactForm} name="sign" id='sign' value='register' class="btn btn-primary">Register</button>
                            </center>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Contact

