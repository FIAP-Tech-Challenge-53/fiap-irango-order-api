import Update from '@/core/application/usecase/pedido/update.use-case';
import Pedido from '@/core/domain/entities/pedido'
import BusinessException from '@/core/domain/errors/business-exception'
import PedidoUpdateDto from '@/core/domain/dto/input/pedido-update.dto';
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'
import IPedidoRepository from "@/core/domain/repositories/ipedido.repository";
import Consumidor from '@/core/domain/entities/consumidor';
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum';

describe("Update Class Tests", () => {

    let mockPedidoGateway:PedidoGateway;
    let useCase:Update;
    let mockPedidoRepository:jest.Mocked<IPedidoRepository>;

    let mockCreate:jest.Mock<any>;
    let mockfindById:jest.Mock<any>;
    let mockList:jest.Mock<any>;
    let mocksave:jest.Mock<any>;

    beforeEach(() => {

        jest.mock('@/core/operation/gateway/pedido.gateway');

        mockCreate = jest.fn();
        mockfindById = jest.fn();
        mockList = jest.fn();
        mocksave = jest.fn();
    
        PedidoGateway.prototype.create = mockCreate;
        PedidoGateway.prototype.findById = mockfindById;
        PedidoGateway.prototype.list = mockList;
        PedidoGateway.prototype.save = mocksave;

        mockPedidoRepository = {
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            save: jest.fn()
        }

        mockPedidoGateway = new PedidoGateway(mockPedidoRepository);
        useCase = new Update(mockPedidoGateway);
    });

    it("constructor class test", async () => {
        expect(useCase).toBeInstanceOf(Update);
    });
    
    it("test handle method using not available pedido", async () => {
        const dto:PedidoUpdateDto = {
            status: PedidoStatusEnum.FINALIZADO
        };

        mockfindById.mockResolvedValue(undefined);
        await expect(useCase.handle(1, dto)).rejects.toThrow(new BusinessException('Pedido não encontrado'));
    });

    it("test handle method using available pedido", async () => {
        const dto:PedidoUpdateDto = {
            status: PedidoStatusEnum.FINALIZADO
        };

        let consumidor = Consumidor.create("Test", "26055706571", "test@test.com");
        
        let pedido = new Pedido({
            id: 1,
            consumidorId: '1',
            consumidor: consumidor,
            itens: [],
            total: 1,
            status: PedidoStatusEnum.PREPARACAO,
            pagamentoId: '',
            createdAt: new Date(1),
            updatedAt: new Date(1)
        });
        
        mockfindById.mockResolvedValue(pedido);
        
        let result = await useCase.handle(1, dto);

        pedido.status = PedidoStatusEnum.FINALIZADO;

        expect(mockfindById).toHaveBeenCalledTimes(1);
        expect(mockfindById).toHaveBeenCalledWith(1);
        expect(mocksave).toHaveBeenCalledWith(pedido);
        expect(result).toEqual(pedido);
    });
});