
beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    process.env.JWT_SECRET = "FOO"
    process.env.JWT_EXPIRES_IN = "1d"
    process.env.OTOKEN_JWT_SECRET = "FOOO"
    process.env.OTOKEN_JWT_EXPIRES_IN = "10m"

    process.env.JWT_SECRET_PROVIDER = "FOOOO"
    process.env.JWT_EXPIRES_IN_PROVIDER = "1d"

    process.env.OTP_EXPIRES_IN = "3"

}); // runs before all tests

afterAll(async () => {
   
}); // runs after all tests