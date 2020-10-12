export class ValidationResult {
    errors: ValidationErrors;
    isValid: boolean = false;

    constuctor(errors: ValidationErrors, isValid: boolean) {
        this.errors = errors;
        this.isValid = isValid;
    }
}

export class ValidationErrors {
    name: string = '';
    email: string = '';
    password: string = '';
    password2: string = '';
}
