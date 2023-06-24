import React, { useEffect,useState } from 'react'
import pic from '../images/pic.jpg'
import { useNavigate } from 'react-router-dom'

const About = () => {
    const history = useNavigate();
    const [userData,setuserData] = useState({});
    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            setuserData(data);
            console.log("thisis user",userData.name);
            if (!res.status === 200) {
                const err = new Error(res.error);
                throw err;
            }
        } catch (error) {
            console.log(error);
            history('/login');
        }
    }
    useEffect(() => {
        callAboutPage();
    },[])

    return (
        <>
            <div className='container mt-4 p-4 shadow-sm bg-body-tertiary rounded'>
                <form method='GET'>
                    <div className='row justify-content-md-center '>
                        <div className='col-md-5'>
                            <img src={pic} alt="mypic" width="160px" className='p-2' />
                            <ul class="list-group-none p-2 shadow-sm bg-body-tertiary rounded">
                                <li class="list-group-item">An item</li>
                                <li class="list-group-item">A second item</li>
                                <li class="list-group-item">A third item</li>
                                <li class="list-group-item">A fourth item</li>
                                <li class="list-group-item">And a fifth one</li>
                            </ul>
                        </div>
                        <div className="col-md-5">
                            <div className='p-3 shadow-sm bg-body-tertiary rounded'>
                                <table>
                                    <tr>
                                        <td>User Id</td>
                                        <td>{userData._id}</td>
                                    </tr>
                                    <tr>
                                        <td>Name</td>
                                        <td>{userData.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{userData.email}</td>
                                    </tr>
                                    <tr>
                                        <td>phone</td>
                                        <td>{userData.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>profession</td>
                                        <td>{userData.work}</td>
                                    </tr>                                    
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default About


