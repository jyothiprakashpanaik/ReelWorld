
const emailRgx = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

export function emailReducer(state, action) {
    switch (action.type) {
        case 'EMAIL_INPUT':
            return { ...state, value: action.value };
        case 'EMAIL_VALID':
            let val = emailRgx.test(action.value);
            return { ...state, isValid: val, helperText: !val ? "Email ID is invalid" : "" };
        case 'EMAIL_CHECK':
            let valid = emailRgx.test(action.value);
            if (valid === false) {
                return { ...state, isValid: false, helperText: "Email Id is Invalid" }
            }
            else {
                let freq = action.count === 0;
                if (freq) {
                    return { ...state, isValid: true, helperText: "" }
                }
                else {
                    return { ...state, isValid: false, helperText: "Email Id alredy exists" }
                }
            }
        default:
            return { ...state };
    }
}


export function passwordReducer(state, action) {
    switch (action.type) {
        case 'PASSWORD_INPUT':
            return { ...state, value: action.value };
        case 'PASSWORD_VALID':
            let length_check = action.value.trim().length >= 6;
            return { ...state, isValid: length_check, helperText: !length_check ? "Password should be atlest 6 characters" : "" };
        default:
            return { ...state };
    }
}

export function confirmPasswordReducer(state, action) {
    switch (action.type) {
        case 'CONFIRM_PASSWORD_INPUT':
            return { ...state, value: action.value };
        case 'CONFIRM_PASSWORD_VALID':
            return { ...state, isValid: action.value === action.pwd };
        default:
            return { ...state };
    }
}

export function userNameReducer(state, action) {
    switch (action.type) {
        case 'USERNAME_INPUT':
            return { ...state, value: action.value };
        case 'USERNAME_VALID':
            let length_check = action.value.trim().length >= 3;
            return { ...state, isValid: length_check, helperText: !length_check ? "User Name Invalid" : "" };
        case 'USERNAME_CHECK':
            let valid = action.value.length >= 3;
            if (valid === false) {
                return { ...state, isValid: false, helperText: "User Name Invalid atlest 3 characters" }
            }
            else {
                let freq = action.count === 0;
                if (freq) {
                    return { ...state, isValid: true, helperText: "" }
                }
                else {
                    return { ...state, isValid: false, helperText: "User Name alredy exists" }
                }
            }
        default:
            return { ...state };
    }
}

export function fileReducer(state, action) {
    switch (action.type) {
        case 'FILE_INPUT':
            return { ...state, value: action.value };
        default:
            return { ...state };
    }
}