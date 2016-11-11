## Contas bancárias

### Objeto bank_account
Contém os dados de uma conta bancária.

Propriedade            | Tipo      | Descrição
---                    | ---       | ---
`agencia`              | `String`  | Agência bancária
`agencia_dv`           | `String`  | Dígito verificador da agência bancária
`bank_code`            | `String`  | Código do banco
`charge_transfer_fees` | `Boolean` | **Deprecado**
`conta`                | `String`  | Número da conta bancária
`conta_dv`             | `String`  | Dígito verificador da conta bancária
`date_created`         | `String`  | Data de criação da conta no formato ISODate
`document_number`      | `String`  | Documento identificador do titular da conta (CPF ou CNPJ)
`document_type`        | `String`  | Tipo do documento identificador do titular da conta
`holder_name`          | `String`  | Nome do portador do cartão
`id`                   | `String`  | Id da conta bancária
`legal_name`           | `String`  | Nome completo (se pessoa física) ou razão social (se pessoa jurídica)
`object`               | `String`  | Nome do tipo do objeto criado/modificado

#### Exemplo do objeto

```json
{
    "agencia": "0808",
    "agencia_dv": "8",
    "bank_code": "184",
    "charge_transfer_fees": true,
    "conta": "08808",
    "conta_dv": "8",
    "date_created": "2016-05-18T21:14:30.762Z",
    "document_number": "80802694594",
    "document_type": "cpf",
    "id": 13459415,
    "legal_name": "JOSÉ COMPANY",
    "object": "bank_account"
}
```

### Criar uma conta bancária

Você pode criar uma conta bancária para receber futuros pagamentos através da rota `/bank_accounts`, assim você poderá usar o `id` do objeto gerado para criar recebedores.

Parâmetro | Tipo | Descrição
---|---|---
`api_key` <br /> **Obrigatório** | `String` | Chave da API, pode ser encontrado em sua dashboard
`bank_code` <br /> **Obrigatório** | `String` | Código do banco <br /> **OBS**: Deve conter 3 caracteres, apenas números
`agencia` <br /> **Obrigatório** | `String` | Agência bancária onde a conta foi criada <br /> **OBS**: Limite de 5 caracteres, apenas números
`agencia_dv` <br /> **Obrigatório** | `String` | Dígito verificador da agência bancária <br /> **OBS**: Deve conter 1 dígito, apenas números
`conta` <br /> **Obrigatório** | `String` | Número da conta bancária <br /> **OBS**: Limite de 13 caracteres, apenas números
`conta_dv` <br /> **Obrigatório** | `String` | Dígito verificador da conta bancária <br /> **OBS**: Limite de 2 caracteres, apenas alfanuméricos
`document_number` <br /> **Obrigatório** | `String` | Documento identificador do titular da conta (CPF ou CNPJ).
`legal_name` <br /> **Obrigatório** | `String` | Nome completo (se pessoa física) ou razão social (se pessoa jurídica)

```endpoint
POST /bank_accounts
```

#### Exemplo de requisição

```curl
# Criando uma conta bancária
curl -X POST https://api.pagar.me/1/bank_accounts \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "bank_code=184" \
-d "agencia=0808" \
-d "agencia_dv=8" \
-d "conta=08808" \
-d "conta_dv=8" \
-d "document_number=80802694594" \
-d "legal_name=José"
```

```ruby
# Criando uma conta bancária
require 'pagarme'

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

account = PagarMe::BankAccount.new({
    :bank_code       => "184" ,
    :agencia         => "0808" ,
    :agencia_dv      => "8" ,
    :conta           => "08808" ,
    :conta_dv        => "8" ,
    :document_number => "80802694594" ,
    :legal_name      => "José"
})

account.create
```

```php
// Criando uma conta bancária
<?php

require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$account = new Pagarme_Bank_Account(array(
	"bank_code" => "184",
    "agencia" => "0808",
    "agencia_dv" => "8",
    "conta" => "08808",
    "conta_dv" => "8",
    "document_number" => "80802694594",
    "legal_name" => "José"
));

$account->create();
```

```csharp
// Criando uma conta bancária
PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

BankAccount account = new BankAccount();
account.bankCode = "184";
account.Agencia = "0808";
account.AgenciaDv = "8";
account.Conta = "08808";
account.ContaDv = "8";
account.DocumentNumber = "80802694594";
account.LegalName = "José";

account.Save();
```

#### Exemplo de resposta

```json
{
    "agencia": "0808",
    "agencia_dv": "8",
    "bank_code": "184",
    "charge_transfer_fees": true,
    "conta": "08808",
    "conta_dv": "8",
    "date_created": "2016-05-18T21:14:30.762Z",
    "document_number": "80802694594",
    "document_type": "cpf",
    "id": 13459415,
    "legal_name": "JOSÉ COMPANY",
    "object": "bank_account"
}
```

### Retornar uma conta bancária

Use a rota `/bank_accounts/:id` para retornar os dados de uma conta bancária.

Parâmetro | Descrição
---|---|---
`api_key` <br /> **Obrigatório** | `String` | Chave da API, pode ser encontrado em sua dashboard
`id` <br /> **Obrigatório** | `String` | Id da conta bancária

```endpoint
GET /bank_accounts/{id}
```

#### Exemplo de requisição

```curl
# Retornando uma conta bancária
curl -X GET https://api.pagar.me/1/bank_accounts/13459415 \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x"
```

```ruby
# Retornando uma conta bancária
require 'pagarme'

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

account = PagarMe::BankAccount.find_by_id(13459415)
```

```php
// Retornando uma conta bancária
<?php

require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$account = PagarMe_Bank_Account::findById(13459415);
```

```csharp
// Retornando uma conta bancária
PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

var account = PagarMeService.GetDefaultService().BankAccounts.Find(13459415);
```

#### Exemplo de resposta

```json
{
    "agencia": "0808",
    "agencia_dv": "8",
    "bank_code": "184",
    "charge_transfer_fees": true,
    "conta": "08808",
    "conta_dv": "8",
    "date_created": "2016-05-18T21:14:30.762Z",
    "document_number": "80802694594",
    "document_type": "cpf",
    "id": 13459415,
    "legal_name": "JOSÉ COMPANY",
    "object": "bank_account"
}
```

### Retornar todas as contas bancárias

Use a rota `/bank_accounts` para retornar todas as contas bancárias.

Parâmetro | Tipo | Descrição
---|---|---
`page` <br /> **Padrão: 1** | `Integer` | Útil para implementação de uma paginação de resultados
`count` <br /> **Padrão: 10** | `Integer` | Retorna `n` objetos de `bank_account`

```endpoint
GET /bank_accounts
```

#### Exemplo de requisição

```curl
# Retornando todas as contas bancárias
curl -X GET https://api.pagar.me/1/bank_accounts \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "page=1" \
-d "count=1"
```

```ruby
# Retornando todas as contas bancárias
require 'pagarme'

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

account = PagarMe::BankAccount.all(1, 1)
```

```php
// Retornando todas as contas bancárias
<?php

require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$account = PagarMe_Bank_Account::all(1, 1);
```

```csharp
// Retornando todas as contas bancárias
PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

var account = PagarMeService.GetDefaultService().BankAccounts.FindAll(1, 1);
```

#### Exemplo de resposta

```json
[
    {
        "agencia": "0808",
        "agencia_dv": "8",
        "bank_code": "184",
        "charge_transfer_fees": true,
        "conta": "08808",
        "conta_dv": "8",
        "date_created": "2016-05-18T21:14:30.762Z",
        "document_number": "80802694594",
        "document_type": "cpf",
        "id": 13459415,
        "legal_name": "JOSÉ COMPANY",
        "object": "bank_account"
    }
]
```
