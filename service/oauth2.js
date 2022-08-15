import {google} from 'googleapis'

export const getNewRefreshToken = async(oldRefreshToken) => {
    let oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URL,
    )

    oauth2Client.credentials.refresh_token = oldRefreshToken

    oauth2Client.refreshAccessToken((error, token) => {
        if(error) throw new Error(error.message)
        if(token) {
            const {access_token, expiry_date, refresh_token} = token
            global.oauth2 = {access_token, expiry_date, refresh_token}
        }
    })
}