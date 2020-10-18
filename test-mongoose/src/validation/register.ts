import Validator from 'validator';
import isEmpty from 'is-empty';
import { ValidationInput, ValidationResult, ValidationErrors } from './result';


const validateRegisterInput = (data: ValidationInput): ValidationResult => {
    let errors = new ValidationErrors();

    data.name= !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(Validator.isEmpty(data.name)) errors.name = 'name field required';

    if(Validator.isEmpty(data.email)) errors.email = 'email required';
    else if(!Validator.isEmail(data.email)) errors.email = 'invalid email';

    if(Validator.isEmpty(data.password)) errors.password = 'password required';
    if(!Validator.isLength(data.password, { min: 6, max: 30})) 
        errors.password = 'invalid password length';

    if(!Validator.equals(data.password, data.password2)) 
        errors.password2 = 'password does not match'

    let result = new ValidationResult(); //FIXME
    result.errors = errors;
    result.isValid = errors.isValid();

    return result;
}

export default validateRegisterInput;