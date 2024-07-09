import { PaymentGateway } from "@/core/operation/gateway/payment.gateway";
import IPaymentService from "@/core/domain/services/ipayment.service";
import Pedido from "@/core/domain/entities/pedido";

describe("Test PaymentGateway class", () => {

    let gateway: PaymentGateway;
    let mockedPaymentService: jest.Mocked<IPaymentService>;

    beforeEach(() => {

        mockedPaymentService = {
            registerOrder: jest.fn()
        };

        gateway = new PaymentGateway(mockedPaymentService);
    });

    it("Testing class constructor", () => {
        expect(gateway).toBeInstanceOf(PaymentGateway);
    });

    it("Test registerOrder method", async () => {
        const pedido = new Pedido();

        mockedPaymentService.registerOrder.mockResolvedValue("mocked-result");

        let result = await gateway.registerOrder(pedido);

        expect(mockedPaymentService.registerOrder).toHaveBeenCalledWith(pedido);
        expect(mockedPaymentService.registerOrder).toHaveBeenCalledTimes(1);
        expect(result).toEqual("mocked-result");
    });
});