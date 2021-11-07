import { google } from "googleapis"
import { User } from "../models/user.js"

function passUserToView(req, res, next) {
  res.locals.user = req.user ? req.user : null
  next()
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect("/auth/google")
}

function maintainGoogleToken(req, res, next) {
  const user = req.user ? req.user : null
  if (!user) return next()
  req.googleOAuthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK
  )
  
  const credentials = {
    access_token: req.user.googleToken.accessToken,
    refresh_token: req.user.googleToken.refreshToken,
    scope: req.user.googleToken.scope,
    token_type: req.user.googleToken.tokenType
  }

  req.googleOAuthClient.setCredentials(credentials)
  
  console.log(req.googleOAuthClient);

  req.googleOAuthClient.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      User.findById(req.user._id)
      .then(user => {
        user.googleToken.refreshToken = tokens.refresh_token
        user.googleToken.accessToken = tokens.access_token
        user.save()
      })
    }
  })
  next()
}

export {
  passUserToView,
  isLoggedIn,
  maintainGoogleToken
}