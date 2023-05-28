const { Router } = require('express')
const { check } = require('express-validator')

const { signIn, logIn } = require('../controllers/auth.controller')
const { validate, validateLoginJWT } = require('../middlewares/validators')
const { emailExist } = require('../helpers/dbValidators')

const router = Router()

router.post('/signIn', [

    check('username', 'Username is required').notEmpty().isLength({max:35, min: 3}),
    check('email', 'Email is required').isEmail().notEmpty(),
    check('email').custom( emailExist ),
    check('password', 'Password is required').isStrongPassword({minLength:4, minNumbers:4, minSymbols: 0, minLowercase: 0, minUppercase: 0, returnScore: true, }).notEmpty().isLength({max:20}),
    check('password2', 'Password 2 is required').isStrongPassword({minLength:4, minNumbers:4, minSymbols: 0, minLowercase: 0, minUppercase: 0, returnScore: true, }).notEmpty().isLength({max:20}),
    validate

] ,signIn)

router.post('/logIn', [

    validateLoginJWT,
    check('email', 'Email must be valid').isEmail(),
    check('password', 'Password is required').isLength({max: 70 ,min: 6}),
    validate

], logIn)

module.exports = router