const DiscordOauth2 = require("discord-oauth2")

const oauth = new DiscordOauth2({
    clientId: "918086996109451294",
      clientSecret: "xDPiRUDfuoZNVIV3mFQ6UmletJNEs1BQ",
      redirectUri: "http://localhost:3000/api/callback",
  })


async function genUrl() {

    const oauthUrl = await oauth.generateAuthUrl({
        scope: ["identify", "guilds"],
        state: "open", 
      });

        return oauthUrl;

      
    
}


async function callback(code) {
    console.log(code);
    const data = await oauth.tokenRequest({
        code: code,
        scope: "identify guilds",
        grantType: "authorization_code",
      });
      
      return data


      


}

async function getUser(access_token) {
    const user = await oauth.getUser(access_token)

    return user
    
}

module.exports = {
    genUrl,
    callback,
    getUser
}