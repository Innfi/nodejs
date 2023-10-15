import Validator from 'validator';
import isEmpty from 'is-empty';
import { ValidationInput, ValidationResult, ValidationErrors } from './result';


const validateLoginInput = (data: ValidationInput): ValidationResult => {
    let errors = new ValidationErrors();

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.email)) errors.email = 'email required';
    else if(!Validator.isEmail(data.email)) errors.email = 'invalid email';

    if(Validator.isEmpty(data.password)) errors.password = 'password required';

    let result = new ValidationResult(); //FIXME
    result.errors = errors;
    result.isValid = errors.isValid();

    return result;
}

export default validateLoginInput;
