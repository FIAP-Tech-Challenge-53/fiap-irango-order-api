import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('ExclusionRequest')
export class ExclusionRequest {
  constructor (params?: Partial<ExclusionRequest>) {
    Object.assign(this, params)
  }

  @PrimaryColumn({ length: 36 })
  public readonly id: string

  @Column()
  public nome: string

  @Column()
  public endereco: string

  @Column()
  public telefone: string

  @Column()
  public data: string
}
