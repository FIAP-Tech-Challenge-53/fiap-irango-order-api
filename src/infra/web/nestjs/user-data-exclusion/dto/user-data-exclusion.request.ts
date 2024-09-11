import { ApiProperty } from '@nestjs/swagger'

import InputExclusionRequestDto from '@/core/domain/dto/input/exclusion-request.dto'

export class UserDataExclusionRequest implements InputExclusionRequestDto {
  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome do Cliente Cadastrado',
    type: String,
    required: true,
  })
  readonly nome: string

  @ApiProperty({
    example: 'Avenida Brasil, 123, Jd América, São Paulo/SP, 01234-567',
    description: 'Endereço do Cliente Cadastrado',
    type: String,
    required: true,
  })
  readonly endereco: string

  @ApiProperty({
    example: '+55 11 91234-5678',
    description: 'Telefone do Cliente Cadastrado',
    type: String,
    required: true,
  })
  readonly telefone: string
}
