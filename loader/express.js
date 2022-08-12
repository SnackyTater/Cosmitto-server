import cors from "cors"
import path from "path"
import errorHandler from "../middleware/errorHandler.js"

//declare API here
import accountAPI from "#api/account.js"
//////////////////

export default function (express) {
    const app = express()

    app.use(cors())
    app.use(express.json()) //parsing raw json
    app.use(express.urlencoded({extended: true})) //parsing application/x-www-form-urlencoded

    //use API route
    app.use("/api/account", accountAPI)

    //use middleware
    app.use(errorHandler)

    //use front-end build
    // app.use(express.static(path.resolve(__dirname, '../../client/build')));
    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
    // })

    return app
}
