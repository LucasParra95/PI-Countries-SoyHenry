import React from "react";
import { Link } from "react-router-dom";
import s from './style.css'

export default function Card( { name, flag, continent, id } ){
    return (
        <div className='card'>
            <img src={flag} alt="img not found"/>
            {/* <h2>{flag}</h2> */}
            <h3>{name}</h3>
            <p>{continent}</p>
            <Link to={`/countries/${id}`}></Link>
        </div>
    );
}