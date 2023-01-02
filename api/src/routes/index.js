<<<<<<< HEAD
const { Router, response } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const { getDbInfo, postActivity } = require('../controllers/controllers.js')
=======
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
>>>>>>> 28eee10edae3e070dabba76d4a5206704cfbb72c

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

<<<<<<< HEAD
router.get('/countries', async (req, res)=>{
    const name = req.query.name;
    let countriesTotal = await getDbInfo();
    if( name ){
        let countryName = await countriesTotal.filter( el=>el.name.toLowerCase().includes(name.toLocaleLowerCase()) )
        
        countryName.length ?
            res.status(200).send(countryName) :
            res.status(404).send('El pais ingresado no existe')
    } else {
            res.status(200).send(countriesTotal);
    }
});

router.get('/countries/:id', async(req, res) => {
    const {id} = req.params
    let countries = await getDbInfo();
    if (id) {
      let countryId = await countries.filter(el => el.id == id.toUpperCase());
      if (countryId.length ) {
        res.status(200).send(countryId)
      } else {
        res.status(400).json({message: 'Country not found'});
      }
    }
  });

router.post('/activities', async(req, res) => {

    try {
        const newActivity = await postActivity(req, res)
        return newActivity;
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})
=======
>>>>>>> 28eee10edae3e070dabba76d4a5206704cfbb72c

module.exports = router;
