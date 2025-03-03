import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Rutas que no requieren autenticación
const publicRoutes = ['/auth/login', '/auth/register', '/'];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Permitir acceso a rutas públicas sin verificación
    if (publicRoutes.some(route => path.startsWith(route))) {
        return NextResponse.next();
    }

    // Obtener el token de las cookies
    const token = request.cookies.get('jwt-token')?.value;

    // Si no hay token, redirigir al login
    if (!token) {
        return redirectToLogin(request);
    }

    try {
        // Verificar el JWT (reemplaza 'tu-secreto' con tu clave secreta real)
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'tu-secreto');
        await jwtVerify(token, secretKey);

        // Token válido, permitir acceso
        return NextResponse.next();
    } catch (error) {
        // Token inválido o expirado, redirigir al login
        console.error('Error al verificar JWT:', error);
        return redirectToLogin(request);
    }
}

function redirectToLogin(request: NextRequest) {
    const loginUrl = new URL('/auth/login', request.url);
    // Opcional: guardar la URL original para redirigir después del login
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
    matcher: [
        /*
         * Coincide con todas las rutas excepto:
         * 1. /api/auth (rutas de autenticación de API)
         * 2. /auth/login, /auth/register (páginas de autenticación)
         * 3. /_next (archivos internos de Next.js)
         * 4. /favicon.ico, /images, etc. (archivos estáticos)
         */
        '/((?!api/auth|auth/login|auth/register|_next|favicon.ico|images).*)',
    ],
};

export default middleware;