const cors = require('cors')
const errorHandler = require("#middleware/errorHandler.js") 

//require API here
const userAPI = require('#api/user.js') 
const accountAPI = require("#api/account.js") 
const passionAPI = require('#api/passion.js') 
const requestAPI = require('#api/request.js') 
const matchMakingAPI = require('#api/matchMaking.js') 
//////////////////

module.exports = (express) => {
    const app = express()

    app.use(cors())
    app.use(express.json()) //parsing raw json
    app.use(express.urlencoded({extended: true})) //parsing application/x-www-form-urlencoded

    //use API route
    app.use("/api/user", userAPI)
    app.use("/api/account", accountAPI)
    app.use("/api/passion", passionAPI)
    app.use("/api/request", requestAPI)
    app.use("/api/match-making", matchMakingAPI)
    
    //use middleware
    app.use(errorHandler)

    //use front-end build
    // app.use(express.static(path.resolve(__dirname, '../../client/build')));
    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
    // })

    return app
}
