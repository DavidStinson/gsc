import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  }, 
  function (accessToken, refreshToken, tokenDetails, profile, done) {
    User.findOne({ googleId: profile.id })
    .then(user => {
      if (user) {
        user.googleToken = {
          accessToken,
          refreshToken,
          scope: tokenDetails.scope,
          tokenType: tokenDetails.token_type,
        }
        user.save()
        return done(null, user)
      } else {
        const newProfile = new Profile({
          name: profile.displayName,
          avatar: profile.photos[0].value,
        })
        const newUser = new User({
          email: profile.emails[0].value,
          googleId: profile.id,
          profile: newProfile._id,
          googleToken: {
            accessToken,
            refreshToken,
            scope: tokenDetails.scope,
            tokenType: tokenDetails.token_type,
          }
        })
        newProfile.save()
        .then(()=> {
          newUser.save()
          .then(() => {
            return done(null, newUser) 
          })
          .catch(err => {
            if (err) {
              // Something went wrong while making a user - delete the profile
              // we just created to prevent orphan profiles.
              Profile.findByIdAndDelete(newProfile._id)
              return done(err)
            } 
          })
        })
        .catch(err => {
          if (err) return done(err)
        })
      }
    })
    .catch(err => {
      if (err) return done(err)
    })
  }
))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .populate('profile', 'name avatar')
  .exec()
  .then(user => {
    done(null, user)
  })
  .catch(error => {
    done(error, null)
  })
})
