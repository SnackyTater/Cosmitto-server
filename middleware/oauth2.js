import {getNewRefreshToken} from "#service/oauth2.js"

export default async function (req, res, next) {
    try {
        const {expiry_date, refresh_token} = oauth2

        if(Date.now() > expiry_date){
            getNewRefreshToken(refresh_token)
        }
        
        next()
    } catch (err) {
        next(err)
    }
}
