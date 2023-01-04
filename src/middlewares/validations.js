import { signupSchema } from '../joi/signupSchema.js';

export const validationSignupSchema = async (req, res, next) => {
    console.log('Start validation schema Signup')

    const { error } = signupSchema.validate(req.body)

    if (error) {
        return res.status(400).send('error')
    }

    console.log('Validation schema Signup finished with success')
    await next();
}