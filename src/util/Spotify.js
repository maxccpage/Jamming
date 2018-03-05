import { error } from "util";

let userAccessToken = 'placeholder';
let tokenTime = '';
const redirectURI = 'http://localhost:3002/callback';
const clientID = '28b5e49f49fa48ef996c1f8673eea5ed';
const clientSecret = '923f57b6c2884a82a2cfef0b84b6c428';

const Spotify = {
    getAccessToken() {
        if (userAccessToken != 'placeholder') {
            return userAccessToken;
        } else {
            window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token`);
        }
        if (window.location.href.indexOf('callback')) {
            let url = window.location.href;
            let accessRegex = '/access_token=([^&]*)/';
            let timerRegex = '/expires_in=([^&]*)/';
            userAccessToken = url.match(accessRegex);
            tokenTime = url.match(timerRegex);
            console.log(userAccessToken);
        }
    }
}
export default Spotify; 