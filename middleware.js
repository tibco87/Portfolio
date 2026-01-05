// Vercel Edge Middleware for language detection
// This runs on the edge before the request reaches the app

export const config = {
  matcher: '/',
};

export default function middleware(request) {
  // Get the Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Check if Slovak is preferred
  const prefersSlovak = acceptLanguage.toLowerCase().startsWith('sk') || 
                        acceptLanguage.toLowerCase().includes('sk-');
  
  // Determine target language
  const targetLang = prefersSlovak ? 'sk' : 'en';
  
  // Create redirect URL
  const url = new URL(`/${targetLang}`, request.url);
  
  // Return 302 redirect (temporary) for browser users
  // This allows the preference to change if they switch browser language
  return Response.redirect(url, 302);
}
