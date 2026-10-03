import { normalizePassword } from './normalize.js';
import { zxcvbn } from './zxcvbn.js';
import type { ZxcvbnResult } from '@zxcvbn-ts/core';

type PasswordCheck = {
    pass: boolean;
    reason: string;
    validationResult?: ZxcvbnResult;  
};

export function validatePassword(password: string, email: string, name: string){
    password = normalizePassword(password);
    const response: PasswordCheck = { pass: false, reason: '' };
    if (password.length < 12) {
        response.reason = 'password_too_short';
        return response
    }
    if (password.length > 1024){
        response.reason = 'password_too_long';
        return response
    }
    
    const emailUser = email.toLowerCase().split('@')[0] ?? '';
    const nameWords = name.toLowerCase().split(' ');

    const validationResult = zxcvbn.check(password, [emailUser, ...nameWords, 'cloud', 'mycloud', 'privcloud']);
    response.validationResult = validationResult;
    if (validationResult.guessesLog10 >= 14) {
        response.pass = true;
        return response;
    }
    response.reason = 'password_too_weak';
    return response;
}
