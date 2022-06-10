import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
    ],
    accessType: "offline",
    prompt: "consent",
    keepSessionInfo: true,
  })
)

router.get(
  '/google/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/google',
  })
)

router.get('/logout', function (req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err)}
    res.redirect('/')
  })
})
export { router }
