import cors from 'cors'
import path from 'path'
import errorHandler from '../middleware/errorHandler.js'

//declare API here
import sampleAPI from '../api/sample.js'
//////////////////

export default function (express) {
    const app = express();

    app.use(cors());
    app.use(express.json());    //parsing raw json
    app.use(express.urlencoded({ extended: true })); //parsing application/x-www-form-urlencoded

    //use API route
    app.use('/', sampleAPI)

    //use middleware
    app.use(errorHandler)

    //use front-end build
    // app.use(express.static(path.resolve(__dirname, '../../client/build')));
    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html')); 
    // })

    return app;
}

