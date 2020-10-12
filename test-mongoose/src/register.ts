import Validator from 'validator';
import isEmpty from 'is-empty';
import User from './models/user';


const validateRegisterInput = (data: typeof User): object => {
    let errors = {};

    

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

export default validateRegisterInput;