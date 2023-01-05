import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, orderCountriesAlphabetically, orderCountriesByPopulation, filterCountriesByContinent } from "../actions";
import Card from "./Card.jsx";
import Paginate from "./Paginate.jsx";
import NavBar from "./NavBar";

export default function Home(){

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(9);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry,indexOfLastCountry);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    function handleFilterContinent(e){
        dispatch(filterCountriesByContinent(e.target.value))
    }

    function handleSortAlphabetically (e){
        e.preventDefault();
        dispatch(orderCountriesAlphabetically(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleSortPopulation (e){
        e.preventDefault();
        dispatch(orderCountriesByPopulation(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <NavBar/>
            <h1>Individual Project - Henry Countries</h1>
            <div>
                <h3>Filter by</h3>
                <h5>Continent</h5>
                <select onChange={e => handleFilterContinent(e)}>
                    <option value='All'>All</option>
                    <option value='Africa'>Africa</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='North America'>North America</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='South America'>South America</option>
                </select>
            </div>

            <div>
                <h5>A-Z</h5>
                <button value='asc1' onClick={e => handleSortAlphabetically(e)}>Upward</button>
                <button value='desc1' onClick={e => handleSortAlphabetically(e)}>Downward</button>

                {/* <select onChange={e => handleSortAlphabetically(e)}>
                    <option value='asc'>Upward</option>
                    <option value='desc'>Downward</option>
                </select> */}
            </div>
            <div>
                <h5>Population</h5>
                <button value='asc2' onClick={e => handleSortPopulation(e)}>Lower to Higher</button>
                <button value='desc2' onClick={e => handleSortPopulation(e)}>Higher to Lower</button>

                {/* <select onChange={e => handleSortPopulation(e)}>
                    <option value='asc'>Lower to Higher</option>
                    <option value='desc'>Higher to Lower</option>
                </select> */}
            </div>
            <div>
                <Paginate countriesPerPage={countriesPerPage} allCountries={allCountries.length} paginado={paginado}/>
            </div>
            <div className='containerCards'>
                {currentCountries?.map(el => {
                    return(
                        <div >
                        <div>
                            <Link className="links" to={'/home/'+ el.id}>
                                <Card name={ el.name } flag={ el.flag } continent={ el.continent } key={ el.id }/>
                             </Link>
                         </div>
                         </div>
                    );
                })
                }
            </div>
        </div>

    )
}