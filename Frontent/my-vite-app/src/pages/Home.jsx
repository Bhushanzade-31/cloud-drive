
import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'; 
import MenuAppBar from '../pages/Dashboard/appbar';



const Home = () =>{
    const { user } = useContext(UserDataContext);

    return (
        <div>
             <MenuAppBar user={user} />
           
        </div>
    )
}

export default Home