import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validateRegisterInput from '../validation/register';
import validateLoginInput from '../validation/login';
import User from '../models/user';
import { ValidationResult, ValidationErrors } from '../validation/result';


const userRouter = express.Router();

userRouter.post('/register', (req: express.Request, res: express.Response) => {
    const result = validateRegisterInput(req.body);
    if(!result.isValid) return res.status(400).json(result.errors);
  
    User.findOne({ email: req.body.email }).then(user => {
        if(user) {
            return res.status(400).json({ email: 'email exists'});
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

userRouter.post('/login', (req: express.Request, res: express.Response) => {
    const { errors, isValid } = validateLoginInput(req.body);
    
    if(!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user => {
        if(!user) return res.status(404).json({ emailnotfound: 'email not found'});

        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };

                jwt.sign(payload, 'test-key', { expiresIn: 65535 }, 
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    });
            } else {
                return res.status(400)
                    .json({ passwordincorrect: 'password incorrect' });
            }
        });
    });
});

export default userRouter;