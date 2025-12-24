import rateLimit from "express-rate-limit";

const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
})

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Demasiados intentos de registro. Intenta nuevamente en 1 hora.'
  }
});


export { emailLimiter, authLimiter }