export class ValidationInput {
    name: string = '';
    email: string = '';
    password: string = '';
    password2: string = '';
}

export class ValidationResult {
    errors: ValidationErrors;
    isValid: boolean = false;

    public constuctor(errors: ValidationErrors, isValid: boolean) {
        this.errors = errors;
        this.isValid = isValid;
    }
}

export class ValidationErrors {
    name: string = '';
    email: string = '';
    password: string = '';
    password2: string = '';

    isValid(): boolean {
        if(this.name !== '') return false;
        if(this.email !== '') return false;
        if(this.password !== '') return false;
        if(this.password2 !== '') return false;

        return true;
    }
}
