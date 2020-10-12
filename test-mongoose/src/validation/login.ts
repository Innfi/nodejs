import Validator from 'validator';
import isEmpty from 'is-empty';
import { ValidationResult, ValidationErrors } from './result';


class DummyData {
    name: string = '';
    email: string = '';
    password: string = '';
    password2: string = '';
}

const validateLoginInput = (data: DummyData): ValidationResult => {
    let errors = new ValidationErrors();

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.email)) errors.email = 'email required';
    else if(!Validator.isEmail(data.email)) errors.email = 'invalid email';

    if(Validator.isEmpty(data.password)) errors.password = 'password required';

    let result = new ValidationResult(); //FIXME
    result.errors = errors;
    result.isValid = isEmpty(errors);

    return result;
}

export default validateLoginInput;
