import React from "react";

export default function Paginate({countriesPerPage, allCountries, paginado}){
    const pageNumbers = []

    for (let i=1; i<=Math.ceil(allCountries/countriesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <div>
            <p>Page</p>
            <ul className="paginado">
                {   pageNumbers?.map(number =>(
                    <li className="number" key={number}>
                        <button onClick={()=>paginado(number)} >{ number }</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}