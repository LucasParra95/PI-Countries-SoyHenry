import {React, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index.js";

export default function Detail(props) {
    const dispatch = useDispatch()
    const id = props.match.params.id
    const country = useSelector((state) => state.detail[0])
    const activities = useSelector((state)=>state.activities)
    const history = useHistory()
    
    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch, id])

    function handleClick(e){
        e.preventDefault();
        history.push("/home")
        
    }

    return (
        
        <div >

            <div >
            <Link to= "/home"><h3>Back to Home</h3></Link>
            </div>

            <div >

                <div  >
                <h2 >Country Details</h2>
                </div>
            {
                country ?
                <div >
                    <img  src={country.flag} alt="Imagen no disponible" />
                    <h2 >{country.name}</h2>
                    <h4 >Continent: {country.continent}</h4>
                    <h4 >Country ID: {country.id}</h4>
                    <h4 >Capital: {country.capital}</h4>
                    <h4 >Region: {country.subregion}</h4>
                    <h4 >Area: {country.area} km²</h4>
                    <h4 >Population: {country.population} Hab.</h4>
                </div> : <p>Loading ...</p>

            }
                <div >
                <h3 >Country Activities</h3> 
            
    
            {activities.length >0? activities.map(el => {
              return (
                <div>

                    <h3>{el.name}</h3>
                    <h5>Difficulty: {el.difficulty}</h5>
                    <h5>Duration: {el.duration} (hs:mins:secs)</h5>
                    <h5>Season: {el.season}</h5>
                
                </div>
              )}): <p>There are no activities yet</p> }
              

                </div>
            </div>
        </div>
        
    )
};