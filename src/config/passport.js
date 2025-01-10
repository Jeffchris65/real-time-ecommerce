import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ 'socialLogins.google.id': profile.id });

          if (user) {
            user.socialLogins.google = {
              id: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
            };
            await user.save();
            return done(null, user);
          }

          // Create new user
          user = new User({
            email: profile.emails[0].value,
            name: profile.displayName,
            socialLogins: {
              google: {
                id: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
              },
            },
            isEmailVerified: true, // Google emails are verified
          });

          await user.save();
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
}

// Facebook Strategy
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/api/auth/facebook/callback',
        profileFields: ['id', 'emails', 'name'],
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ 'socialLogins.facebook.id': profile.id });

          if (user) {
            user.socialLogins.facebook = {
              id: profile.id,
              email: profile.emails[0].value,
              name: `${profile.name.givenName} ${profile.name.familyName}`,
            };
            await user.save();
            return done(null, user);
          }

          // Create new user
          user = new User({
            email: profile.emails[0].value,
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            socialLogins: {
              facebook: {
                id: profile.id,
                email: profile.emails[0].value,
                name: `${profile.name.givenName} ${profile.name.familyName}`,
              },
            },
            isEmailVerified: true, // Facebook emails are verified
          });

          await user.save();
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
