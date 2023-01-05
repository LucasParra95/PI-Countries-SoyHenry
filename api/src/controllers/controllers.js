const { Country, Activity } = require('../db');
const axios = require ('axios');

const getApiInfo = async ()=>{
    try {
        const apiUrl = await axios.get('https://restcountries.com/v3/all')
        const apiInfo = await apiUrl.data.map(el => {
            return {
                name : el.name.official,
                flag : el.flags[0],
                id : el.cca3,
                continent : el.continents[0],
                capital : el.capital,
                subregion : el.subregion,
                area : el.area,
                population : el.population
            }
        });

        const saveInDb = () => {
            apiInfo.map(e => {
              Country.findOrCreate({
                where: {
                  name: e.name,
                  id: e.id
                },
                defaults: {
                  continent: e.continent,
                  flag: e.flag,
                  capital: e.capital,
                  subregion: e.subregion,
                  area: e.area,
                  population: e.population
                },
              }).catch((error) => {console.log(error)})
            })
          }
          saveInDb();
          return apiInfo;

    }catch(error) {
        return res.status(400).json({ message: error.message })
    }
};

const getDbInfo = async ()=>{
    try {
        await getApiInfo();
        return await Country.findAll({
            include:{
                model: Activity,
                attributes: ['name', 'duration', 'difficulty', 'season'],
                through: {
                    attributes: []
                },
            }
        });
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
};

const postActivity = async (req, res) => {
    
    try {
        const {name, difficulty, duration, season, countryId} = req.body;

        const createActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
        });

        const countries = await Country.findAll({
            where: {id: countryId}
        });
    
        createActivity.addCountries(countries);
        return res.status(200).send(createActivity);
    } catch (e) {
        console.log(e.message)
        return res.status(400).json({message: e.message})
    }
}

module.exports = { getDbInfo, postActivity }
