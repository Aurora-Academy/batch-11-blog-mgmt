# Authentication and Authorization

Authentication => You are about to login

INPUT > EMAIL / PASSWORD

RULES TO BE IMPLEMENTED IN DATABASE

1. does user exist?
2. is user banned?
3. is email verified?
4. does password match?
5. token release (DUMMY JSON.com > AUTH > token) {jsonwebtoken}

OUTPUT: TOKEN

==================================

AUTHORIZATION

INPUT: TOKEN
METHOD: HEADERS

YOU WILL ALWAYS SEND ACCESS TOKEN (REQ HEADERS)
AND
YOU WILL ALWAYS CHECK THE TOKEN BY VERIFY AND RECHECKING USER INFORMATION

OUTPUT: API OPERATIONS
