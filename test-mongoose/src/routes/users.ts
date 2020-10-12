import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validateRegisterInput from '../validation/register';
import validateLoginrInput from '../validation/login';
import User from '../models/user';
import { ValidationResult, ValidationErrors } from '../validation/result';


const router = express.Router();

router.post('/register', (req: express.Request, res: express.Response) => {
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