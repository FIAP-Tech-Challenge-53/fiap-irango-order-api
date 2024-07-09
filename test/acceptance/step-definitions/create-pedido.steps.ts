
import { faker } from '@faker-js/faker';
import { When, Then, Given,After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import * as assert from "assert";

import IntegrationTestSetup, { ITestSetup } from '../../integration/setup/IntegrationTestSetup';
import Consumidor from '@/core/domain/entities/consumidor';
import { Produto } from '@/infra/persistence/typeorm/entities/produto'
import CreatePedidoRequest from '@/infra/web/nestjs/pedidos/dto/create-pedido.request';
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum';
// import ItemPedidoResponse from '@/infra/web/nestjs/pedidos/dto/item-pedido.response';
import { Factory } from '@/test/integration/setup/utils/FactoryUtils';

let setup: ITestSetup
let consumidor: Consumidor
let produtoFactory: Factory<Produto>
let produtos: Produto[]


BeforeAll(async () => {
  setup = await IntegrationTestSetup.getInstance()
  produtoFactory = setup.factory.produtoFactory()
  await setup.db.truncateAll()
  await setup.app.init()
})

Before(async () => {
  produtos = await produtoFactory.createMany(faker.number.int({ min: 1, max: 10 }))
})

AfterAll(async () => {
  const setup = await IntegrationTestSetup.getInstance()
  await setup.db.truncateAll()
  await setup.module.close()
  await setup.app.close()
})

After(async () => {
  const setup = await IntegrationTestSetup.getInstance()
  await setup.db.truncateAll()
})


const buildRequestBody = (consumidor?: Consumidor) => {
  const itens = produtos
    .map((produto: Produto) => {
      const ingredientesCount = faker.number.int({ min: 0, max: produto.ingredientes.length })
      const ingredientesRemovidos = faker.helpers.arrayElements(produto.ingredientes, ingredientesCount)
        .map((ingrediente) => ingrediente.id)
      return {
        produtoId: produto.id,
        ingredientesRemovidos
      }
    })

  const requestBody: CreatePedidoRequest = {
    consumidorId: consumidor?.id,
    itens
  }

  return requestBody
}

// const buildExpectedResponse = (consumidor?: Consumidor) => {
//   const expectedResponse = {
//     id: expect.any(Number),
//     total: expect.any(Number),
//     status: PedidoStatusEnum.PAGAMENTO_PENDENTE,
//     pagamentoId: expect.stringMatching(/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/),
//     createdAt: expect.stringMatching(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z/),
//     updatedAt: expect.stringMatching(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z/),
//     itens: produtos
//       .sort((a, b) => a.id.localeCompare(b.id))
//       .map((produto) => ({
//         id: expect.stringMatching(/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/),
//         preco: expect.any(Number),
//         produto: {
//           id: produto.id,
//           nome: produto.nome,
//         },
//       })),
//   }

//   return consumidor ? { ...expectedResponse, consumidorId: consumidor.id } : expectedResponse
// }

var response: any

Given('que sou consumidor identificado', async function () {
    consumidor = await setup.factory.consumidor()

  });

  When('criar um pedido', async function () {
    const requestBody = buildRequestBody(consumidor)

    response = await setup.server
    .request('/v1/pedidos')
    .post(requestBody)

  });

  Then('o pedido é criado com sucesso', function () {
    // const expectedResponse = buildExpectedResponse(consumidor)

    // expect(response.status).toBe(201)
    assert.equal(response.status, 201)

    // const itens = (response.body.data.itens as ItemPedidoResponse[]).sort((a, b) => a.produtoId.localeCompare(b.produtoId))
  
    assert.equal(response.body.data.status, PedidoStatusEnum.PAGAMENTO_PENDENTE)
    // expect({ ...response.body.data, itens }).toMatchObject(expectedResponse)
  });
