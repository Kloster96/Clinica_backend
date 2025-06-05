const  express = require('express');
const  dotenv = require('dotenv');
const rutaPacientes = require('./routes/pacientes.route.js')
const rutaTurnos = require('./routes/turnos.route.js')
const home = require('./routes/home.routes.js');
const morgan = require('morgan');
const turnosWeb = require('./routes/web/turnos.web.routes.js');
const pacientesWeb = require('./routes/web/pacientes.web.routes.js');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
dotenv.config()

class Server {
  constructor (template=process.env.TEMPLATE || 'ejs') {
    this.app = express()
    this.port = process.env.PORT || 3001
    this.template = template;
    this.middleware()
    //this.cors()
    this.engine()
    this.rutas()
 
    
  }

/*   cors () {
    this.app.use(cors())
  } */

  engine (template) {
     try{
       require.resolve(this.template);
        
       this.app.set('view engine', this.template)
       this.app.set('views', path.join(__dirname,'src', 'views'))
       this.app.set('layout', 'ejs/layouts/main')
     }catch (error) {
        console.log('Error al configurar el motor de plantillas:',template)
        
      }

  }
  middleware () {
    this.app.use(express.static(path.join(__dirname, '..', 'public')));
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use(expressLayouts)
  }

  rutas () {

    this.app.use('/',home)
    this.app.use('/api/v1/pacientes', rutaPacientes)
    this.app.use('/api/v1/turnos', rutaTurnos)
 
    // aca van las otras rutas
    //this.app.set('view engine','ejs')
    this.app.set('views', './src/views/')

    this.app.use('/turnos', turnosWeb)
    this.app.use('/pacientes', pacientesWeb)

    this.app.use((req,res) => {
      res.status(404).send('404 - Pagina o encontrada')
    })
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(
        `Server running on port ${this.port}, host: ${process.env.HOST}:${this.port}`
      )
    })
  }
}

module.exports = Server