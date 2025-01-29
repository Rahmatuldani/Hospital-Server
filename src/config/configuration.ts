export default () => ({
    port: process.env.PORT || 5000,
    baseUrl: process.env.BASE_URL || "http://localhost:5000",
    mongoUri: process.env.MONGOOSE_URI || "mongodb://127.0.0.1:27017/hospital",
    secretKey: process.env.SECRET_KEY || "hospital_secret_key"
})