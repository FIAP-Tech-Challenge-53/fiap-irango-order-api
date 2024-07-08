import Email from "@/core/domain/value-object/email";
import BusinessException from '@/core/domain/errors/business-exception'

describe("Test of Email Value-Object class", () => {
    it("Test constructor class with validate as true using valid email", () => {
        const email = new Email("test@test.com");
        expect(email).toBeInstanceOf(Email);
    });

    it("Test constructor class with validate as true using invalid email", () => {
        expect(() => {
            new Email("test1test.com");
        }).toThrow(new BusinessException('Invalid Email'));
    });

    it("Test constructor class with validate as false", () => {
        const email = new Email("test@test.com", false);
        expect(email).toBeInstanceOf(Email);
    });

    it("Test toString method", () => {
        const email = new Email("test@test.com");
        expect(email.toString()).toEqual("test@test.com");
    });
});