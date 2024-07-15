import IConsumidorRepository from '@/core/domain/repositories/iconsumidor.repository'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import IProdutoRepository from '@/core/domain/repositories/iproduto.repository'
import ICookService from '@/core/domain/services/icook.service'
import IPaymentService from '@/core/domain/services/ipayment.service'
import { PedidoController } from '@/core/operation/controllers/pedido.controller'
import CreatePedidoRequest from '@/infra/web/nestjs/pedidos/dto/create-pedido.request'
import PedidoResponse from '@/infra/web/nestjs/pedidos/dto/pedido.response'
import UpdatePedidoRequest from '@/infra/web/nestjs/pedidos/dto/update-pedido.request'

describe('Consumidor Controller Class Tests', () => {
  let controller:PedidoController

  let pedidoRepository:jest.Mocked<IPedidoRepository>
  let produtoRepository:jest.Mocked<IProdutoRepository>
  let consumidorRepository:jest.Mocked<IConsumidorRepository>
  let cookService:jest.Mocked<ICookService>
  let paymentService:jest.Mocked<IPaymentService>

  let mockControllerCreate:jest.Mock<any>
  let mockControllerUpdate:jest.Mock<any>
  let mockControllerList:jest.Mock<any>
  let mockControllerFindById:jest.Mock<any>
  let mockControllerConfirmPayment:jest.Mock<any>
  let mockControllerStartCooking:jest.Mock<any>
  let mockControllerFinishCooking:jest.Mock<any>

  beforeEach(() => {
    mockControllerCreate = jest.fn()
    mockControllerUpdate = jest.fn()
    mockControllerList = jest.fn()
    mockControllerFindById = jest.fn()
    mockControllerConfirmPayment = jest.fn()
    mockControllerStartCooking = jest.fn()
    mockControllerFinishCooking = jest.fn()

    pedidoRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    }

    produtoRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByCategoria: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    }

    consumidorRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByCPF: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    }

    cookService = {
      registerOrder: jest.fn(),
    }

    paymentService = {
      registerOrder: jest.fn(),
    }

    PedidoController.prototype.create = mockControllerCreate
    PedidoController.prototype.update = mockControllerUpdate
    PedidoController.prototype.list = mockControllerList
    PedidoController.prototype.findById = mockControllerFindById
    PedidoController.prototype.confirmPayment = mockControllerConfirmPayment
    PedidoController.prototype.startCooking = mockControllerStartCooking
    PedidoController.prototype.finishCooking = mockControllerFinishCooking

    controller = new PedidoController(
      pedidoRepository,
      consumidorRepository,
      produtoRepository,
      paymentService,
      cookService
    )
  })

  it('constructor class test', async () => {
    expect(controller).toBeInstanceOf(PedidoController)
  })

  it('list method class test', async () => {
    const response = new PedidoResponse()
    mockControllerList.mockResolvedValue([response])
    const result = await controller.list()
    expect(mockControllerList).toHaveBeenCalledTimes(1)
    expect(result).toEqual([response])
  })

  it('create method class test', async () => {
    const request = new CreatePedidoRequest()
    const response = new PedidoResponse()
    mockControllerCreate.mockResolvedValue(response)
    const result = await controller.create(request)
    expect(mockControllerCreate).toHaveBeenCalledTimes(1)
    expect(mockControllerCreate).toHaveBeenCalledWith(request)
    expect(result).toEqual(response)
  })

  it('update method class test', async () => {
    const id = 1
    const request = new UpdatePedidoRequest()
    const response = new PedidoResponse()
    mockControllerUpdate.mockResolvedValue(response)
    const result = await controller.update(id, request)
    expect(mockControllerUpdate).toHaveBeenCalledTimes(1)
    expect(mockControllerUpdate).toHaveBeenCalledWith(id, request)
    expect(result).toEqual(response)
  })

  it('confirmPayment method class test', async () => {
    const id = 1
    const response = new PedidoResponse()
    mockControllerConfirmPayment.mockResolvedValue(response)
    const result = await controller.confirmPayment(id)
    expect(mockControllerConfirmPayment).toHaveBeenCalledTimes(1)
    expect(mockControllerConfirmPayment).toHaveBeenCalledWith(id)
    expect(result).toEqual(response)
  })

  it('startCooking method class test', async () => {
    const id = 1
    const response = new PedidoResponse()
    mockControllerStartCooking.mockResolvedValue(response)
    const result = await controller.startCooking(id)
    expect(mockControllerStartCooking).toHaveBeenCalledTimes(1)
    expect(mockControllerStartCooking).toHaveBeenCalledWith(id)
    expect(result).toEqual(response)
  })

  it('finishCooking method class test', async () => {
    const id = 1
    const response = new PedidoResponse()
    mockControllerFinishCooking.mockResolvedValue(response)
    const result = await controller.finishCooking(id)
    expect(mockControllerFinishCooking).toHaveBeenCalledTimes(1)
    expect(mockControllerFinishCooking).toHaveBeenCalledWith(id)
    expect(result).toEqual(response)
  })

  it('findById method class test', async () => {
    const id = 1
    const response = new PedidoResponse()
    mockControllerFindById.mockResolvedValue(response)
    const result = await controller.findById(id)
    expect(mockControllerFindById).toHaveBeenCalledTimes(1)
    expect(mockControllerFindById).toHaveBeenCalledWith(id)
    expect(result).toEqual(response)
  })
})
