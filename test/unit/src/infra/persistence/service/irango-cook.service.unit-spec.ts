import IRangoCookService from "@/infra/persistence/service/irango-cook.service";
import Pedido from '@/core/domain/entities/pedido'
import Consumidor from "@/core/domain/entities/consumidor";
import { PedidoStatusEnum } from "@/core/domain/enums/pedido-status.enum";
import axios from 'axios'
import { Environment as envs } from '@/infra/web/nestjs/environment'

describe("IRangoCookService Class Tests", () => {

    let service:IRangoCookService;
    let mockPost:jest.Mock<any>;

    beforeEach(() => {
        jest.mock('axios');
        mockPost = jest.fn();
        axios.post = mockPost;
        service = new IRangoCookService();
    });

    it("constructor class test", () => {
        expect(service).toBeInstanceOf(IRangoCookService);
    });

    it("Test success call on registerOrder method", async () => {
        const url = `${envs.SERVICE_IRANGO_COOK_API}/v1/pedidos/register`
        const consumidor:Consumidor = Consumidor.create('Test', '27117957999', 'test@test.com');

        const pedido:Pedido = Pedido.create(
            consumidor,
            [],
            PedidoStatusEnum.PREPARACAO
        );

        mockPost.mockImplementation(() => {});

        await service.registerOrder(pedido);

        expect(mockPost).toHaveBeenCalledTimes(1);
        expect(mockPost).toHaveBeenCalledWith(url, pedido);
    });

    it("Test failed call on registerOrder method", async () => {
        const url = `${envs.SERVICE_IRANGO_COOK_API}/v1/pedidos/register`
        const consumidor:Consumidor = Consumidor.create('Test', '27117957999', 'test@test.com');

        const pedido:Pedido = Pedido.create(
            consumidor,
            [],
            PedidoStatusEnum.PREPARACAO
        );

        mockPost.mockImplementation(() => {
            throw new Error("Mocked Error");
        });

        await service.registerOrder(pedido);

        expect(mockPost).toHaveBeenCalledTimes(1);
        expect(mockPost).toHaveBeenCalledWith(url, pedido);
    });
});