import React from "react";
// import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../actions";

export default function NavBar(){

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getCountriesByName(name))
    }

    return (

        <div className="navbar">
            <nav>
                <a href="http://localhost:3000/home">Home</a>
                <a href="http://localhost:3000/addActivity">New Activity</a>
                <a href="http://localhost:3000/">Start</a>

                <span>
                    <input type="text" placeholder="Search Country..." onChange={(e)=> handleInputChange(e)}/>
                    <button type="submit" onClick={(e)=>handleSubmit(e)}>Buscar</button>
                </span>
                <div class="animation start-home"></div>
            </nav>
        </div>
    );
}