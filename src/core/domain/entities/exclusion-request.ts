import { v4 as uuidv4 } from 'uuid'

import Endereco from '../value-object/Endereco'
import Telefone from '../value-object/Telefone'

export default class ExclusionRequest {
  public constructor (
    public readonly id: string,
    public nome: string,
    public endereco: Endereco,
    public telefone: Telefone,
    public data: Date
  ) {}

  static create (
    nome: string,
    endereco: string,
    telefone: string,
  ): ExclusionRequest {
    const userId = uuidv4()
    const data = new Date()
    return new ExclusionRequest(userId, nome, new Endereco(endereco), new Telefone(telefone), data)
  }
}
