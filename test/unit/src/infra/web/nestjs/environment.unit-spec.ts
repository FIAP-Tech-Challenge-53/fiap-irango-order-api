import { Environment } from "@/infra/web/nestjs/environment";

describe("Test for static methods of Environment class", () => {

    it("test validate method when process.env.NODE_ENV is not configured", () => {
        process.env.NODE_ENV = 'test';
        expect(() => { Environment.validate(); }).not.toThrow(new Error('NODE_ENV is not defined'));
    });

    it("test validate method when process.env.NODE_ENV is not configured", () => {
        delete process.env.NODE_ENV;
        expect(() => { Environment.validate(); }).toThrow(new Error('NODE_ENV is not defined'));
    });

    it("test get NODE_ENV method", () => {
        process.env.NODE_ENV = 'test';
        expect(Environment.NODE_ENV).toEqual('test');
    });

    it("test get IS_DEV_ENV method", () => {
        process.env.NODE_ENV = 'local';
        expect(Environment.IS_DEV_ENV).toEqual(true);
    });

    it("test get PORT method", () => {
        process.env.PORT = '3000';
        expect(Environment.PORT).toEqual('3000');
    });

    it("test get SENTRY_DSN method", () => {
        process.env.SENTRY_DSN = 'test';
        expect(Environment.SENTRY_DSN).toEqual('test');
    });

    it("test get DB_HOSTNAME method", () => {
        process.env.DB_HOSTNAME = 'test';
        expect(Environment.DB_HOSTNAME).toEqual('test');
    });
    
    it("test get DB_PORT method", () => {
        process.env.DB_PORT = '3000';
        expect(Environment.DB_PORT).toEqual(3000);
    });
    
    it("test get DB_USERNAME method", () => {
        process.env.DB_USERNAME = 'test';
        expect(Environment.DB_USERNAME).toEqual('test');
    });

    it("test get DB_PASSWORD method", () => {
        process.env.DB_PASSWORD = 'test';
        expect(Environment.DB_PASSWORD).toEqual('test');
    });

    it("test get DB_DATABASE method", () => {
        process.env.DB_DATABASE = 'test';
        expect(Environment.DB_DATABASE).toEqual('test');
    });

    it("test get DB_CONNECTION_LIMIT method", () => {
        process.env.DB_CONNECTION_LIMIT = '1000';
        expect(Environment.DB_CONNECTION_LIMIT).toEqual(1000);
    });

    it("test get DB_CONNECTION_TIMEOUT method", () => {
        process.env.DB_CONNECTION_TIMEOUT = '1000';
        expect(Environment.DB_CONNECTION_TIMEOUT).toEqual(1000);
    });

    it("test get REDIS_HOSTNAME method", () => {
        process.env.REDIS_HOSTNAME = 'test';
        expect(Environment.REDIS_HOSTNAME).toEqual('test');
    });

    it("test get REDIS_PORT method", () => {
        process.env.REDIS_PORT = '1000';
        expect(Environment.REDIS_PORT).toEqual(1000);
    });

    it("test get REDIS_DB method", () => {
        process.env.REDIS_DB = '1000';
        expect(Environment.REDIS_DB).toEqual(1000);
    });

    it("test get REDIS_ENABLED method", () => {
        process.env.REDIS_ENABLED = 'true';
        expect(Environment.REDIS_ENABLED).toEqual(true);
    });

    it("test get CACHE_ENABLED method", () => {
        process.env.CACHE_ENABLED = 'true';
        expect(Environment.CACHE_ENABLED).toEqual(true);
    });

    it("test get SERVICE_IRANGO_PAYMENT_API method", () => {
        process.env.SERVICE_IRANGO_PAYMENT_API = 'test';
        expect(Environment.SERVICE_IRANGO_PAYMENT_API).toEqual('test');
    });

    it("test get SERVICE_IRANGO_COOK_API method", () => {
        process.env.SERVICE_IRANGO_COOK_API = 'test';
        expect(Environment.SERVICE_IRANGO_COOK_API).toEqual('test');
    });
    
});