export const isValidPassword = (password: string): boolean => {
    const hasLowerCaseRegex = /[a-z]/g;
    const hasUpperCaseRegex = /[A-Z]/g;
    const hasOnDigitNumber = /[0-9]/g;
    const hasSpecialCharacter = /[^a-zA-Z\d]/g;

    return (
        hasLowerCaseRegex.test(password) &&
        hasUpperCaseRegex.test(password) &&
        hasOnDigitNumber.test(password) &&
        hasSpecialCharacter.test(password) &&
        password.length >= 8
    );
};
