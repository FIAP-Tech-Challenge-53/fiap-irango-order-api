import ItemPedidoDto from '@/core/domain/dto/output/item-pedido.dto'
import ItemPedido from '@/core/domain/entities/item-pedido'
import Produto from '@/core/domain/entities/produto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'
import ItemPedidoMapper from '@/core/domain/mappers/item-pedido.mapper'

describe('Testing ItemPedidoMapper Class', () => {
  it('toDto static method should receive ItemPedido Class and return ItemPedidoDto class', () => {
    const produto = new Produto({
      id: '',
      nome: '',
      descricao: '',
      preco: 1,
      imagemUrl: '',
      categoria: ProdutoCategoriaEnum.ACOMPANHAMENTO,
      ingredientes: [],
      deletedAt: new Date(1)
    })

    const itemPedido = new ItemPedido({
      id: '',
      produtoId: '',
      produto,
      pedidoId: 1,
      preco: 1,
      ingredientesRemovidos: []
    })

    const dto = ItemPedidoMapper.toDto(itemPedido)

    expect(dto.id).toEqual('')
    expect(dto.produtoId).toEqual('')
    expect(dto.produto).toEqual(produto)
    expect(dto.preco).toEqual(1)
    expect(dto.ingredientesRemovidos).toStrictEqual([])
  })

  it('toDomainEntity static method should receive ItemPedidoDto Class and return ItemPedido class', () => {
    const dto:ItemPedidoDto = {
      id: '',
      produtoId: '',
      produto: {
        id: '',
        nome: '',
        descricao: '',
        preco: 1,
        imagemUrl: '',
        categoria: ProdutoCategoriaEnum.ACOMPANHAMENTO,
        ingredientes: [],
        deletedAt: new Date(1)
      },
      pedidoId: 1,
      preco: 1,
      ingredientesRemovidos: []
    }

    const itemPedido = ItemPedidoMapper.toDomainEntity(dto)

    expect(itemPedido).toBeInstanceOf(ItemPedido)
  })
})
