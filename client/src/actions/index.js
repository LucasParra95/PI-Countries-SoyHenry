import axios from 'axios';


export function getCountries(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/countries', {});
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}

export function orderCountriesByPopulation(payload){
    return {
        type: 'ORDER_BY_POPULATION',
        payload
    }
}

export function orderCountriesAlphabetically(payload){
    return {
        type: 'ORDER_ALPHABETICALLY',
        payload
    }
}

export function getDetail(id) {
    return async function (dispatch) {
      try {
        let json = await axios.get("http://localhost:3001/countries/" + id);
        return dispatch({
          type: 'DETAIL',
          payload: json.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

export function getCountriesByName(name){
    return async function(dispatch){
        try {
            var json = await axios.get('http://localhost:3001/countries?name='+name);
            return dispatch({
                type: 'GET_NAME_COUNTRIES',
                payload: json.data
        })
        } catch (e) {
            console.log(e)
        }
        
    }
}

export function postActivity(payload){
    return async function(dispatch){
        const response = await axios.post('http://localhost:3001/activities', payload);
        return response;
    }
}