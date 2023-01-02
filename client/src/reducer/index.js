
var initialState = {
    countries: [],
    singleCountry: [],
    activities: [],
    detail:[]
}

function rootReducer(state= initialState, action) {
    switch(action.type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                singleCountry: action.payload
            }

        case 'ORDER_BY_POPULATION':
            let sorted = action.payload === 'asc2' ?
                state.countries.sort(function (a,b) {
                    if (a.population > b.population) {
                        return 1
                    }
                    if(b.population > a.population) {
                        return -1
                    }
                    return 0
                }) :
                state.countries.sort(function (a,b) {
                    if (a.population > b.population) {
                        return -1
                    }
                    if(b.population > a.population) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                countries: sorted
            }

        case 'ORDER_ALPHABETICALLY':
            let sortedArr = action.payload === 'asc1' ?
                state.countries.sort(function (a,b) {
                    if (a.name > b.name) {
                        return 1
                    }
                    if(b.name > a.name) {
                        return -1
                    }
                    return 0
                }) :
                state.countries.sort(function (a,b) {
                    if (a.name > b.name) {
                        return -1
                    }
                    if(b.name > a.name) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                countries: sortedArr
            }
        
        case 'DETAIL':
            return {
                ...state,
                detail: action.payload,
                activities: action.payload[0].activities
                
            }


        case 'GET_NAME_COUNTRIES':
            return {
                ...state,
                countries: action.payload

            }
        
        case 'POST_ACTIVITY':
            return {
                ...state
            }
        
        case 'GET_ACTIVITIES':
            return {
                ...state,
                activities: action.payload
            }

        default:
            return state;
             
    }
}

export default rootReducer;