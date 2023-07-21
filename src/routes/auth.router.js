import { Router } from "express";
import passport from "passport";
import { userRegister, userLogin, userLogout, renewToken } from '../controllers/auth.controller.js'
import { validateToken } from "../helpers/utils.js";

const router = Router()

router.get('/', async (req, res) => {
    res.redirect('/auth/login')
})

// Registro
router.post( '/register', userRegister )

// Login
router.post( '/login', userLogin )

// Renovar el token de usuario.
router.get('/renew', validateToken, renewToken)


// GITHUB LOGIN
// TODO: Refactorizar y reemplazar session por jwt
router.get('/github', passport.authenticate('github', {
    scope: ["user:email"]
}), ( req, res ) => {})

router.get('/githubcallback', passport.authenticate('github', { 
    failureRedirect: '/auth/login'
}), async (req,res) => {
    req.session.user =  {
        ...req.user,
        role: 'user'
    }
    res.redirect('/products')
})

// Logout
router.get( '/logout', userLogout )



export default router;