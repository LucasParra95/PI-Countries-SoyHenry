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
    const [errorDifficulty, setErrorDifficulty] = useState('This field cannot be empty');
    const [errorSeason, setErrorSeason] = useState('This field cannot be empty')
    const [errorDuration, setErrorDuration] = useState('This field cannot be empty')


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

    function handleChangeDifficulty(e){
        if(e.target.value === "undefined"||e.target.value === ""){
            setErrorDifficulty('This field cannot be empty')
        }else{
            setErrorDifficulty('')
        }
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleChangeDuration(e){
        if(e.target.value === undefined ||e.target.value === ""){
            setErrorDuration('This field cannot be empty')
        }else{
            setErrorDuration('')
        }
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleChangeSeason(e){
        if(e.target.value === "undefined"||e.target.value === ""){
            setErrorSeason('This field cannot be empty')
        }else{
            setErrorSeason('')
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

        if(errorName===''&&errorDifficulty===''&&errorDuration===''&&errorSeason===''){
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
        }else {
            alert("There is an empty field")
        }
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
                    <select key="difficulty" name="difficulty" onChange={e => handleChangeDifficulty(e)}>

                        <option value="undefined">SELECT DIFFICULTY</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>

                    </select>
                    {!errorDifficulty ? null : <span>{errorDifficulty}</span>}
                </div>
                <div>
                    <label>Duration:</label>
                    <input key="duration" type="time" name="duration" value={input.duration} onChange={(e)=>handleChangeDuration(e)}/>
                    {!errorDuration? null : <span>{errorDuration}</span>}
                </div>
                <div>
                    <label>Season:</label>
                    <select key="season" name="season" onChange={e => handleChangeSeason(e)}>

                        <option value="undefined">SELECT SEASON</option>
                        <option value="Summer">Summer</option>
                        <option value="Autumn">Autumn</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>

                    </select>
                    {!errorSeason? null : <span>{errorSeason}</span>}

                </div>
                <div>
                    <label>Countries:</label>
                    <select type="text" name="countryId" onChangeCapture={e => handleCountries(e)}>
                            <option>SELECT COUNTRIES</option>
                        {countries.map((country) => (
                            <option value={country.id}>{country.name}</option>
                        ))}
                    </select>
                    {input.countryId? <span>You have to select at least one country</span> : null}
                    <ul><li>{input.countryId.map(el=> el + ",  ")}</li></ul>
                </div>
                <button type="submit">Create Activity</button>
            </form>
        </div>
    )
}