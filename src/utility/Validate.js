export function isNullOrEmpty(string) {
    // console.log(string + ": "+ JSON.stringify(string == "") + JSON.stringify(typeof(string) === 'undefined') + JSON.stringify(string == null))
    return string == "" || typeof(string) === 'undefined' || string == null
}

export function passwordsMatch(password, repeatPassword) {
    return password == repeatPassword
}

export function password(password) {
    return password.length >= 6
}

export function email(email) {
    return !isNullOrEmpty(email) && email.includes('@') && email.includes('.')
}

export function isNotNull(object) {
    return object !== 'undefined' && object != null
}