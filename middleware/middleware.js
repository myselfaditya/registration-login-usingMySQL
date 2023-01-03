const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs:24*60*60*1000,
    max:5,
    message: "Too many incorrect attempts, please try again after 24 Hrs",
    standardHeaders:true,
    legacyHeaders:false
})

module.exports = {
    limiter
} 