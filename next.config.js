const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = {
    publicRuntimeConfig: {
        // Will be available on both server and client
        backendUrl: process.env.local.NEXT_PUBLIC_BACKEND_URL,
        backendApiUrl: process.env.local.NEXT_PUBLIC_BACKEND_API_URL,
    },
}
