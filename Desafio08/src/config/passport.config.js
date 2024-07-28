import passport from "passport"
import local from "passport-local"
import google from "passport-google-oauth20"
import jwt from "passport-jwt";
import UserDao from "../dao/mongoDao/user.dao.js"
import { createHash, isValidPassword } from "../utils/hashPassword.js"
import envs from './env.config.js'

const LocalStrategy = local.Strategy
const GoogleStrategy= google.Strategy
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;


const userDao = new UserDao()
const cookieExtractor = (req) => {
    let token = null;
  
    if (req && req.cookies) {
        
        token = req.cookies.accesToken;
        
    }
  
    return token;
  };
export function initializePassport(){

    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField: "email"},
        async ( req,username,password,done) => {
            try {
                const userData = req.body

                const userExist = await userDao.getByEmail(userData.email)
                if (userExist) return done(null,false, {message: 'El email ya se encuentra en uso'})
                
                userData.password = createHash(userData.password)
                const newUser = await userDao.create(userData)
                if (!newUser) return done(null,false, {message: 'No se pudo crear el usuario'})
                return done(null,newUser)
            } catch (error) {
                return done(error)
            }
        }
    ))
    passport.use('login',new LocalStrategy({usernameField: "email"},
        async ( username,password,done) => {
            try {
                
                const user = await userDao.getByEmail(username)
                if (!user || !isValidPassword(user,password)) return done(null,false,{message: 'El email o el password son incorrectos'})
                
                done(null,user)
                
            } catch (error) {
                return done(error)
            }
        }
    ))
    passport.use('google',new GoogleStrategy(
        {
            clientID: envs.GOOGLE_CLIENT_ID,
            clientSecret: envs.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/api/session/login",
        },
        async ( accesToken,refreshToken,profiel,cb) => {
            try {
                const {name, emails} = profile
                const user = {
                    first_name: name.givenName,
                    last_name: name.familyName,
                    email: emails[0].value,
                }
                const userExist = await userDao.getByEmail(user.email)
                if(userExist) return cb(null,userExist)
                const newUser = await userDao.create(user)
                
                cb(null,newUser)
                
            } catch (error) {
                return cb(error)
            }
        }
    ))
    passport.use(
        "jwt",
        new JWTStrategy(
          {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: envs.CODE_SECRET,
          },
          async (jwt_payload, done) => {
            try {
                
                return done(null, await userDao.getById(jwt_payload._id));
            } catch (error) {
              return done(error);
            }
          }
        )
      );
    passport.serializeUser((user,done)=>{
        console.log('serial')
        done(null,user._id)
    })
    passport.deserializeUser(async (id,done) =>{
        const user = await userDao.getById(id)
        console.log('desserial')
        console.log(user)
        done(null,user)
    })
}