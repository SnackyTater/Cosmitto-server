import cors from "cors"
import path from "path"
import errorHandler from "#middleware/errorHandler.js"
import oauth2 from "#middleware/oauth2.js"

//declare API here
import userAPI from '#api/user.js'
import accountAPI from "#api/account.js"
import passionAPI from '#api/passion.js'
import requestAPI from '#api/request.js'
import matchMakingAPI from '#api/matchMaking.js'
//////////////////

export default function (express) {
    const app = express()

    app.use(cors())
    app.use(express.json()) //parsing raw json
    app.use(express.urlencoded({extended: true})) //parsing application/x-www-form-urlencoded
    app.use(oauth2)

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
