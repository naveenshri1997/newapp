import React, { useEffect, useState } from 'react'
const Home = () => {
  const [userName, setuserName] = useState('');
  const [show, setshow] = useState(false);
  const userContact = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      setuserName(data.name);
      setshow(true);
      // console.log("thisis user", userData.name);
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
  return ( <>
     <div>{userName}</div>
     <h2>{show?'Happy to see you back':'welcome'}</h2>
  </>
  )
}

export default Home
