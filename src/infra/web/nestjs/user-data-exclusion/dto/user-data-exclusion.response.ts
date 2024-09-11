import { ApiProperty } from '@nestjs/swagger'

import OutputExclusionRequestDto from '@/core/domain/dto/output/exclusion-request.dto'

export class UserDataExclusionResponse implements OutputExclusionRequestDto {
  @ApiProperty({ description: 'ID no formato uuid', example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805' })
  readonly id: string

  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome do Cliente Cadastrado',
    type: String,
  })
  readonly nome: string

  @ApiProperty({
    example: 'Avenida Brasil, 123, Jd América, São Paulo/SP, 01234-567',
    description: 'Endereço do Cliente Cadastrado',
    type: String,
  })
  readonly endereco: string

  @ApiProperty({
    example: '+55 11 91234-5678',
    description: 'Telefone do Cliente Cadastrado',
    type: String,
  })
  readonly telefone: string

  @ApiProperty({
    description: 'Data do Pedido da Exclusão dos Dados',
    type: String,
    example: '2024-08-21'
  })
  readonly data: string
}
