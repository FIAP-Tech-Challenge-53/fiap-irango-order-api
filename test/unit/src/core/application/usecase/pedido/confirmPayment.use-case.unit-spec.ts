import ConfirmPayment from "@/core/application/usecase/pedido/confirmPayment.use-case";
import Pedido from "@/core/domain/entities/pedido";
import Consumidor from "@/core/domain/entities/consumidor";
import BusinessException from '@/core/domain/errors/business-exception';
import { CookGateway } from '@/core/operation/gateway/cook.gateway';
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway';
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum';
import IPedidoRepository from "@/core/domain/repositories/ipedido.repository";
import ICookService from '@/core/domain/services/icook.service'

describe("ConfirmPayment Class Tests", () => {

    let mockPedidoGateway:PedidoGateway;
    let mockCookGateway:CookGateway;
    let useCase:ConfirmPayment;
    let mockPedidoRepository:jest.Mocked<IPedidoRepository>;
    let mockCookService:jest.Mocked<ICookService>;

    let mockCreate:jest.Mock<any>;
    let mockfindById:jest.Mock<any>;
    let mockList:jest.Mock<any>;
    let mocksave:jest.Mock<any>;
    let mockRegisterOrder:jest.Mock<any>;

    beforeEach(() => {

        jest.mock('@/core/operation/gateway/cook.gateway');
        jest.mock('@/core/operation/gateway/pedido.gateway');

        mockCreate = jest.fn();
        mockfindById = jest.fn();
        mockList = jest.fn();
        mocksave = jest.fn();
        mockRegisterOrder = jest.fn();
    
        PedidoGateway.prototype.create = mockCreate;
        PedidoGateway.prototype.findById = mockfindById;
        PedidoGateway.prototype.list = mockList;
        PedidoGateway.prototype.save = mocksave;

        CookGateway.prototype.registerOrder = mockRegisterOrder;
        
        mockCookService = {
            registerOrder: jest.fn()
        };

        mockPedidoRepository = {
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            save: jest.fn()
        }

        mockPedidoGateway = new PedidoGateway(mockPedidoRepository);
        mockCookGateway = new CookGateway(mockCookService);
        useCase = new ConfirmPayment(mockPedidoGateway, mockCookGateway);
    });

    it("constructor class test", async () => {
        expect(useCase).toBeInstanceOf(ConfirmPayment);
    });
    
    it("test handle method using not available pedido", async () => {
        mockfindById.mockResolvedValue(undefined);
        await expect(useCase.handle(1)).rejects.toThrow(new BusinessException('Pedido não encontrado'));
    });

    it("test handle method using pedido status equal PedidoStatusEnum.PREPARACAO", async () => {
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
        await expect(useCase.handle(1)).rejects.toThrow(new BusinessException('Pedido não está com pagamento pendente'));
    });

    it("test handle method using pedido status equal PedidoStatusEnum.PRONTO", async () => {
        let consumidor = Consumidor.create("Test", "26055706571", "test@test.com");
        
        let pedido = new Pedido({
            id: 1,
            consumidorId: '1',
            consumidor: consumidor,
            itens: [],
            total: 1,
            status: PedidoStatusEnum.PRONTO,
            pagamentoId: '',
            createdAt: new Date(1),
            updatedAt: new Date(1)
        });
        
        mockfindById.mockResolvedValue(pedido);
        await expect(useCase.handle(1)).rejects.toThrow(new BusinessException('Pedido não está com pagamento pendente'));
    });

    it("test handle method using pedido status equal PedidoStatusEnum.FINALIZADO", async () => {
        let consumidor = Consumidor.create("Test", "26055706571", "test@test.com");
        
        let pedido = new Pedido({
            id: 1,
            consumidorId: '1',
            consumidor: consumidor,
            itens: [],
            total: 1,
            status: PedidoStatusEnum.FINALIZADO,
            pagamentoId: '',
            createdAt: new Date(1),
            updatedAt: new Date(1)
        });
        
        mockfindById.mockResolvedValue(pedido);
        await expect(useCase.handle(1)).rejects.toThrow(new BusinessException('Pedido não está com pagamento pendente'));
    });

    it("test handle method using pedido status equal PedidoStatusEnum.RECEBIDO", async () => {
        let consumidor = Consumidor.create("Test", "26055706571", "test@test.com");
        
        let pedido = new Pedido({
            id: 1,
            consumidorId: '1',
            consumidor: consumidor,
            itens: [],
            total: 1,
            status: PedidoStatusEnum.RECEBIDO,
            pagamentoId: '',
            createdAt: new Date(1),
            updatedAt: new Date(1)
        });
        
        mockfindById.mockResolvedValue(pedido);
        mocksave.mockResolvedValue(pedido);

        let result = await useCase.handle(1);

        expect(mockfindById).toHaveBeenCalledTimes(1);
        expect(mocksave).toHaveBeenCalledTimes(1);

        expect(mockfindById).toHaveBeenCalledWith(1);
        expect(mocksave).toHaveBeenCalledWith(pedido);
        
        expect(result).toEqual(pedido);
    });

    it("test handle method using pedido status equal PedidoStatusEnum.PAGAMENTO_PENDENTE", async () => {
        let consumidor = Consumidor.create("Test", "26055706571", "test@test.com");
        
        let pedido = new Pedido({
            id: 1,
            consumidorId: '1',
            consumidor: consumidor,
            itens: [],
            total: 1,
            status: PedidoStatusEnum.PAGAMENTO_PENDENTE,
            pagamentoId: '',
            createdAt: new Date(1),
            updatedAt: new Date(1)
        });
        
        mockfindById.mockResolvedValue(pedido);
        mocksave.mockResolvedValue(pedido);

        let result = await useCase.handle(1);

        pedido.status = PedidoStatusEnum.RECEBIDO;

        expect(mockfindById).toHaveBeenCalledTimes(1);
        expect(mocksave).toHaveBeenCalledTimes(1);
        expect(mockfindById).toHaveBeenCalledWith(1);
        expect(mocksave).toHaveBeenCalledWith(pedido);
        expect(result).toEqual(pedido);
    });
});