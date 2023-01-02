import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../actions";
import NavBar from "./NavBar";

export default function ActivityCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector((state)=>state.countries);
    const [errorName, setErrorName] = useState('This field cannot be empty');
    // const [error, setError] = useState('This field cannot be empty');
    const [error, setError] = useState({
        errorDifficulty: 'This field cannot be empty',
        errorSeason: 'This field cannot be empty',
    })

    const [input, setInput] = useState({
        name:'',
        difficulty:'',
        duration:'',
        season:'',
        countryId:[]
    })

    function validateName(e){
        if(e.target.value === ""){
            setErrorName('This field cannot be empty')   
        }else if(!(/^[A-Za-z\s]*$/.test(e.target.value))){
            setErrorName('Can contain only letters and spaces')
        }else{
            setErrorName('')
        }
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleChange(e){
        if(e.target.value === "undefined"||e.target.value === ""){
            setError('This field cannot be empty')
        }else{
            setError('')
        }
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleCountries(e){
        setInput({
            ...input,
            countryId:[...input.countryId, e.target.value],
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postActivity(input));
        alert("Activity Created!");
        setInput({
            name:'',
            difficulty:'',
            duration:'',
            season:'',
            countryId:[]
        })
        history.push('/home')
    }

    useEffect(()=>{
        dispatch(getCountries())
    },[]);

    

    return(
        <div className="activityCreate">
            <NavBar/>
            <h1>Create your Activity</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input key="name" type="text" name="name" value={input.name} onChange={(e)=>validateName(e)}/>
                    {!errorName? null : <span>{errorName}</span>}
                </div>
                <div>
                    <label>Difficulty:</label>
                    <select key="difficulty" name="difficulty" onChange={e => handleChange(e)}>

                        <option value="undefined">SELECT DIFFICULTY</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>

                    </select>
                    {!error.errorDifficulty ? null : <span>{error.errorDifficulty}</span>}
                </div>
                <div>
                    <label>Duration:</label>
                    <input key="duration" type="time" name="duration" value={input.duration} onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Season:</label>
                    {/* <input type="text" name="season" value={input.season} onChange={(e)=>handleChange(e)}/> */}
                    <select key="season" name="season" onChange={e => handleChange(e)}>

                        <option value="undefined">SELECT SEASON</option>
                        <option value="Summer">Summer</option>
                        <option value="Autumn">Autumn</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>

                    </select>
                    {!error.errorSeason? null : <span>{error.errorSeason}</span>}

                </div>
                <div>
                    <label>Countries:</label>
                    <select type="text" name="countryId" onChangeCapture={e => handleCountries(e)}>
                            <option value={null}>SELECT COUNTRIES</option>
                        {countries.map((country) => (
                            <option value={country.id}>{country.name}</option>
                        ))}
                    </select>
                    <ul><li>{input.countryId.map(el=> el + ",  ")}</li></ul>
                    {/* <input type="text" name="countryId" value={input.countryId} onChange={(e)=>handleChange(e)}/> */}
                </div>
                <button type="submit">Create Activity</button>
            </form>
        </div>
    )
}