import mongoose from 'mongoose'

const Schema = mongoose.Schema

const googleTokenSchema = new Schema({
  accessToken: String,
  refreshToken: String,
  scope: String,
  tokenType: String,
})

const userSchema = new Schema({
  email: String,
  googleId: String,
  profile: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  googleToken: googleTokenSchema,
},{
  timestamps: true,
}
)

const User = mongoose.model('User', userSchema)

export {
  User
}
