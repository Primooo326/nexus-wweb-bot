import { jwtVerify } from 'jose';


export const verifyJwt = (token: string) => {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');
    return jwtVerify(token, secretKey);
}