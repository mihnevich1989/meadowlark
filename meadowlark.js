const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')
const app = express()

const hbs = expressHandlebars.create({
    defaultLayout: 'main',
  extname: 'hbs',
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {}
        this._sections[name] = options.fn(this)
        return null
      }
    }  
  /* ,
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  } */
})
app.engine('hbs', hbs.engine)
app.set('views', 'views')
app.set('view engine', 'hbs')

app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)
app.get('/about', handlers.about)
// custom 404 page
app.use(handlers.notFound)
// custom 500 page
app.use(handlers.serverError)

const port = process.env.PORT || 3000
if (require.main === module) {
    app.listen(port, () => console.log(
        `Express started on http://localhost:${port}; ` +
        `press Ctrl-C to terminate.`))
} else {
    module.exports = app
}