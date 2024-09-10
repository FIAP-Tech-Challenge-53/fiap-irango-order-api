# Relatório de Impacto à Proteção de Dados (RIPD)

## 1. Introdução

### 1.1. Objetivo

Este Relatório de Impacto à Proteção de Dados (RIPD) tem como objetivo avaliar e documentar os impactos à privacidade e proteção de dados pessoais no projeto acadêmico de um sistema de autoatendimento de uma lanchonete de fast food. O projeto foi desenvolvido como parte prática do programa de especialização em Arquitetura de Software Pós-Tech da Instituição de Ensino FIAP.

### 1.2. Escopo

O relatório abrange as operações de tratamento de dados pessoais, incluindo coleta, armazenamento, processamento e compartilhamento de dados, bem como as medidas de segurança implementadas para proteger esses dados de acordo com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).

### 1.3. Identificação dos Agentes de Tratamento e do Encarregado

- **Controlador:** irango LTDA (software house)

- **Operadores:** estabelecimento comercial que comprou e usa a tecnologia, funcionário que operam a infra da solução.

- **Encarregado:** algum especialista em governança de dados contratado pela irango LTDA.

### 1.4. Necessidade de Elaborar o Relatório

Atendimento ao artigo 5o, inciso II, artigo 10, parágrafo 3o., artigo 14, artigo 42 todos da Lei 13.907/2018 - Lei Geral de Proteção de Dados.

## 2. Necessida e Proporcionalidade

**Fundamentação legal:** artigo 5o, inciso II, artigo 10, parágrafo 3o., artigo 14, artigo 42 todos da Lei 13.907/2018 - Lei Geral de Proteção de Dados.
Tendo em vista que o legítimo interesse do CONTROLADOR é uma das fundamentações em razão de sua responsabilidade solidária ao TITULAR em caso de irregularidade fiscal e tributária:

- o tratamento dos dados sensíveis é indispensável ao cumprimento das exigências da legislação tributária, fiscal e trabalhista brasileira;

- não há outra base legal possível de se utilizar para alcançar o mesmo propósito;

- o processo atual de fato auxilia no propósito almejado. 

Todos os dados coletados com essa finalidade são eliminados após o período exigido pela legislação, que é de 5 (cinco) anos. Enquanto perdurar esse prazo, o encarregado manterá todos os dados devidamente protegidos, inclusive para fins de recuperação de arquivos de segurança e recibos de transmissão e evidência de cumprimento de obrigação acessória e principal.
As informações de privacidade aos titulares seguem as diretrizes da obrigatoriedade de se manterem arquivadas todas as evidências fiscais, tributárias e trabalhistas de todas as informações enviadas aos sistemas oficiais da autoridade tributária brasileira.
A entidade CONTROLADORA poderá, a pedido do TITULAR, transferir a ele a guarda de tais informações, ressalvadas àquelas que o próprio CONTROLADOR, por dever de ofício, deve possuir pelo período constante da legislação.
É importante constar que não há, por legislação, a retroatividade do processamento dos dados, em caso de transferência de guarda de informações. Para fins legais, o direito ao esquecimento será garantido para os dados usados em processos transacionais.

## 3. Descrição do Projeto

### 3.1. Visão Geral

O projeto é o desenvolvimento do backend de um sistema de autoatendimento de uma lanchonete de fast food. O Sistema é composto por quatro serviços distintos:

- **Cardápio:** Gerenciamento do catálogo de produtos disponíveis para a venda na lanchonete. As seguintes informações são gerenciadas: Nome do Produto, Descrição do Produto, Categoria do Produto, Preço do Produto, Imagem do Produto.

- **Clientes:** Gerenciamento da base de usuários clientes do estabelecimento. As seguintes informações dos clientes são coletadas e armazenadas na infraestrutura do estabelecimento: Nome Completo, CPF e Email.

- **Pedidos:** Gerenciamento dos pedidos realizados pelos clientes do estabalecimento. As seguintes informações são coletadas e armazenadas na infraestrutura do estabelecimento: Dados do Cliente, Lista de Produtos inclusas no Pedido, Data de Criação e Retirada do Produto, Id do Pagamento realizado no Gateway de Pagamento.
 
- **Pagamentos:** Gerenciamento dos Pagamentos realizados através do Gateway Mercado Pago. Nenhuma informação do meio de pagamento do cliente é coletada e sequer trafegada pela infraestrutura do estabelecimento, toda a operação do pagamento é realizada diretamente na infraestrutura do gateway de pagamento Mercado Pago. As informações armazenadas na infraestrutura do estabelecimento são: id do pedido, valor total do pedido, id da transação no gateway de pagamento, data do pagamento. 


### 3.2. Fluxo de Dados

- **Coleta:** Todos os Dados persistidos descritos no Item anterior são coletados via Web API's somente.

- **Processamento:** Os dados podem sofrer processamento de diferentes níveis conforme o descrito a seguir:

    - **Aplicação:** Todo processamento de Dado realizado pela aplicação, como validação de payloads e etc. Aqui se leva em conta somente validações realizadas localmente pela aplicação, sem contar com qualquer auxílio de serviços externos. Por exemplo, a aplicação valida se o CPF utilizado se encontra em formato válido, muito embora não valide através de qualquer serviço externo se o CPF fornecido de fato é existente.

    - **Infraestrutura:** Todo processamento realizado pelos serviços de infraestrutura utilizados pelo estabelecimento. Aqui se inclui todo e qualquer serviço utilizado na AWS como: Banco de Dados, Gerenciador de Containers, Redes VPC, Gerenciador de Identidades (IAM) e etc.

    - **Gateway de Pagamento:** Todo processamento realizado pelo Gateway de Pagamento Mercado Pago.

- **Armazenamento:** Assim como o processamento, a persistência de dados podem ocorrer em diferentes níveis:

    - **Transitória:** É o caso dos Banco de Dados Redis (AWS Elasticache) que armazena em memória volátil os dados trafegados na aplicação. Embora o meio de persistência não seja permanente, essa fonte de armazenamento pode armazenar dados da aplicação por tempo considerável de acordo com o tráfego ocorrido no ambiente. Podem ainda existir o caso do registro temporário de Logs.

    - **Permanente:** Nessa caso os dados são persistidos em definitivo, e são somente deletados caso ocorrer operação ativa de requisição da exclusão dos dados.
        - **MySql:** AWS Aurora RDS persiste a Base de Dados de Cliente e Cardápio.
        - **Mongo:** AWS Mongo Atlas Cluster persiste os dados mais volumosos que forma a base de dados de pedidos realizados pelos usuários.
        - **AWS S3:** O serviço AWS Cognito foi utilizado para gerenciamento de identificação de clientes, esse serviço persiste os dados de usuário no bucket S3 da AWS.

    - **Externa:** Se refere aos dados persistido pelo Gateway de Pagamento Mercado Pago.

- **Transmissão:** A transmissão dos dados podem ser discriminadas em duas situações distintas:
    
    - **Transmissão Externa:** Refere-se aos request feito através de Web API trafegados em redes públicas. Toda a transmissão é protegida pelo protocolo HTTPS.

    - **Transmissão Interna:** Refere-se a transmissão de dados que ocorrem internamente da rede VPC da infraestrutura. 

## 4. Identificação e Análise de Riscos

### 4.1. Tipos de Dados Pessoais Tratados

Os únicos dados pessoais tratados pelo sistema são os dados relativos ao Nome, Cpf e email da base de clientes cadastrados.

### 4.2. Potenciais Riscos

- **Risco de Acesso Não Autorizado:** Possibilidade de invasão nos servidores ou banco de dados, expondo dados pessoais dos clientes.

- **Risco de Vazamento de Dados:** Exposição de Dados Pessoais devido a falha de segurança ou vulnerabilidades na aplicação.

- **Risco de Processamento Indevido:** Uso de dados para finalidades não previstas ou sem consentimento dos titulares. 


## 5. Medidas de Segurança Implementadas

Todas as medidas descritas nesse capítulo se referem caso a solução fosse de fato implementada para fins comerciais, dado a natureza acadêmica do projeto, tais medidas não foram de fato implementadas.

### 5.1. Controles Técnicos


- **Criptografia:** Todos os dados em repouso nos Banco de Dados AWS Aurora MySQL e Mongo Atlas se encontram criptografados usando algoritmos de criptografia simétrica do tipo AES-256, onde as master keys estariam salvas em Vaults em no mínimo dois provedores de Nuvens Independentes.

- **Rotação de Chaves:** As session keys utilizada para criptografar os bancos são rotacionadas periodicamente, conforme sugere-se as boas práticas de cybersegurança. As chaves sempre são geradas, destruídas e rotacionadas sempre em ambiente seguro através do serviço Key Management Service da AWS. As chaves nunca saem do ambiente seguro mencionado.

- **Autenticação e Autorização:** O acesso aos diversos serviços do sistema é controlado por autenticação JWT, provido pelo serviço IAM Cognito da AWS. Somente usuários devidamente cadastrados e autorizados devem ter acesso aos recursos do sistema. Ainda é possível garantir acesso granular de acordo com diferentes grupos de usuários (Clientes e Administradores).

- **Segurança na Comunicação:** Toda comunicação entre cliente e servidor é feita via HTTPS. Tráfegos internos ocorrem através de VPC devidamente isoladas e protegidas.

### 5.2. Controles Administrativos

- **Política de Retenção de Dados:** Os dados são armazenados no momento do cadastro do cliente até um eventual pedido de descadastro. Dados referentes aos pedidos continuam existindo na base de dados mesmo após o descadastro do cliente.

- **Treinamento e Conscientização:** Os membros da equipe foram treinados sobre as boas práticas de proteção de dados e conformidade com a LGPD.

## 6. Avaliação de Conformidade com a LGPD

### 6.1. Princípios da LGPD

- **Finalidade:** O sistema respeita o princípio da finalidade ao coletar e processar dados pessoais exclusivamente para os fins claramente definidos e informados aos titulares sem qualquer uso posterior para fins incompatíveis.

- **Adequação:** O tratamento dos dados é adequado ao objetivo declarado, ou seja, a coleta e o processamento dos dados pessoais são compatíveis com as finalidades informadas aos titulares. 

- **Necessidade:** O princípio da necessidade é seguido, limitando a coleta de dados pessoais ao mínimo necessário para alcançar a finalidade pretendida.

- **Livre Acesso:** Os titulares dos dados têm o direito de acessar facilmente suas informações pessoais tratadas pelo sistema. Para garantir o livre acesso, o sistem preve funcionalidades que permitem aos usuários visualizar, atualizar e excluir seus dados diretamente pela interface do sistema.

- **Qualidade dos Dados:** O sistema assegura a qualidade dos dados coletados, garantindo que os dados pessoais sejam precisos, claros, relevantes e atualizados. Mecanismos de validações são aplicados durante a coleta de dados para reduzir erros e fornecer opções para que os usuários atualizem suas informações regularmente.

- **Transparência:** É informado claramente aos titulares dos dados sobre as práticas de tratamento de dados, por meio desse relatório que deve ser acessíveis através da interface de usuário. Em caso de invasão, todos os nossos clientes são notificados publicamente pelo evento ocorrido.

- **Segurança:** É garantido que todas as medidas de Segurança descritas nesse relatório são efetivamente praticadas ao longo do desenvolvimento e mantenimento do sistema.

- **Prevenção:** São realizados testes de segurança regulares, como análises de vulnerabilidades e testes de penetração, para identificar e corrigir potenciais falhas antes que possam ser exploradas. O sistema é atualizado o mais rápido possível em casos de novas vulnerabilidades publicadas pela comunidade de segurança internacional.

- **Não Discriminação:** O tratamento de dados no sistema é realizado de forma justa e não discriminatória. Garantimos que as informações pessoais não são usadas para fins discriminatórios ou para tomar decisões que possam prejudicar os titulares com base em características protegidas, como raça, gênero ou orientação sexual.

- **Responsabilização:** O sistema adota medidas para demonstrar a responsabilidade pelo tratamento dos dados, conforme exigido pela LGPD. Isso inclui a documentação detalhada dos processos de tratamento de dados, a realização de auditorias internas regulares e o compromisso com a conformidade contínua com as normas de proteção de dados. Os membros da equipe são treinados para compreender suas responsabilidades em relação à proteção de dados, e há um plano de resposta a incidentes de segurança.

## 7. Plano de Ação para Mitigação de Riscos

### 7.1. Ações Corretivas

- **Implementação de Logs de Acesso:** Mecanismos de Monitoramento de acesso aos dados são empregados para detecção de acessos não-autorizados.

- **Aplicação de Atualizações de Segurança:** Se qualquer componente de software sofrer qualquer atualização voltado a segurança, tal patch é incorporado a infraestrutura do sistema o quanto antes pela equipe de desenvolvimento.

- **Atualização de Algoritmos:** Dado o rápido avanço que a natureza do setor de tecnologia possui, caso algum algoritmo de segurança passar a ser considerado inseguro pela comunidade internacional de cybersegurança, nosso time de desenvolvimento se compromete em adequar o sistema, incluindo se necessário em casos críticos com a paralização da disponibilidade do serviço.

- **Notificação de Incidentes de CyberSegurança:** Caso os nossos sistemas sofram relevante espécie de incidente de cybersegurança incluindo: tentativa de invasão bem ou mal sucedida, vazamento de dados ou qualquer outro incidente que comprometa a segurança de dados de nosso clientes, a companhia se compromete notificar o incidente publicamente para todos que todos os seus usuários fiquem ciente do ocorrido.

- **Revisão da Política de Segurança:** Atualizações da Política de Segurança deverão acompanhar sempre que novas diretrizes e orientações sejam lançadas na esfera legislativa.


## 8. Conclusão

### 8.1. Considerações Finais

Por fim com esse relatório, firmamos o compromisso dos desenvolvedores desse sistema para com todos os clientes usuários do mesmo em relação a segurança e transparência do uso de dados realizado pelo mesmo seguindo todas as diretrizes orientadoras da Lei de Proteção de Dados Geral (LGPD).

### 8.2. Assinatura e Data