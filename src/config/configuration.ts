export default () => ({
    port: process.env.PORT || 5000,
    baseUrl: process.env.BASE_URL || "http://localhost:5000"
})