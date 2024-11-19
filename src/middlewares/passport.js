import passportJwt from "passport-jwt";
import { JWT_SECRET } from "../config/keys";
import { knex } from "../config/db";
const users = "users";

const jwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

const passportMiddleware = (passport) => {
    passport.use(
        new jwtStrategy(opts, (jwtPayload, done) => {
            knex(users)
                .where("id", jwtPayload.id)
                .first()
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch((err) => console.log(err));
        })
    );
};

export default passportMiddleware;
