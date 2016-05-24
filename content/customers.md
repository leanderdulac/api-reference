## Clientes

### Objeto customer

Propriedade | Tipo | Descrição
---|---|---
`addresses` **=>** | `array` | Lista de endereços do cliente
`city` | `string` | Cidade do cliente
`complementary` | `string` | Complemento do endereço
`country` | `string` | País do cliente
`id` | `integer` | Id do endereço do cliente
`neighborhood` | `string` | Bairro do cliente
`object` | `string` | Nome do tipo do objeto criado/modificado.
`state` | `string` | Estado do cliente
`street` | `string` | Rua do cliente
`street_number` | `string` | Número da rua do cliente
`zipcode` | `string` | Código postal (CEP) do cliente
---|---|---
`born_at` | `date` | Data de nascimento do cliente no formato ISODate
`date_created` | `date` | Data de criação do cliente no formato ISODate
`document_number` | `string` | Número do CPF ou CNPJ do cliente
`document_type` | `string` | Tipo do documento do cliente
`email` | `string` | E-mail do cliente
`gender` | `string` | Gênero do cliente
`id` | `integer` | Id do cliente
`name` | `string` | Data de nascimento do cliente
`object` | `string` | Nome do tipo do objeto criado/modificado.
---|---|---
`phones` **=>** | `array` | Lista de telefones do cliente
`ddd` | `string` | DDD (Discagem Direta à Distância) do cliente
`ddi` | `string` | DDI (Discagem Direta Internacional)
`id` | `integer` | Id do telefone do cliente
`number` | `string` | Telefone do cliente
`object` | `string` | Nome do tipo do objeto criado/modificado.

#### Exemplo do objeto

```json
{
    "addresses": [
        {
            "city": "Richardland",
            "complementary": "Apartamento 8",
            "country": "Lordaeron",
            "id": 30264,
            "neighborhood": "Bairro do Richard",
            "object": "address",
            "state": "Lordaeron",
            "street": "Rua do Richard",
            "street_number": "808",
            "zipcode": "80808080"
        }
    ],
    "born_at": "2015-11-22T02:00:00.000Z",
    "date_created": "2016-05-16T21:04:33.218Z",
    "document_number": "80802694594",
    "document_type": "cpf",
    "email": "richard.deschamps@example.com",
    "gender": "M",
    "id": 64912,
    "name": "Richard Deschamps",
    "object": "customer",
    "phones": [
        {
            "ddd": "88",
            "ddi": "88",
            "id": 29717,
            "number": "808080808",
            "object": "phone"
        }
    ]
}
```

### Criar um cliente

Através dessa rota você pode salvar os dados de um cliente no nosso banco de dados.

Parâmetro | Descrição
---|---
`name` (**Obrigatório**) | Nome ou razão social do cliente
`email` (**Obrigatório**) | E-mail do cliente
`document_number` | Número do CPF ou CNPJ do cliente
`gender` | Gênero do cliente
`born_at` | Data de nascimento do cliente
---|---
`address[street]` (**Obrigatório**) | Nome da rua do cliente
`address[street_number]` (**Obrigatório**) | Número da rua do cliente
`address[neighborhood]` (**Obrigatório**) | Bairro do cliente
`address[complementary]` | Complemento do endereço
`address[city]` | Cidade do cliente
`address[state]` | Estado do cliente
`address[zipcode]` (**Obrigatório**) | Código postal (CEP) do cliente
`address[country]` | País do cliente
---|---
`phone[ddi]` | DDI (Discagem Direta Internacional)
`phone[ddd]` (**Obrigatório**) | DDD (Discagem Direta à Distância)
`phone[number]` (**Obrigatório**) | Número do telefone (máximo de 9 dígitos, apenas números)

```endpoint
POST /customers
```

#### Exemplo de requisição

```curl
# Criando um cliente
curl -X POST https://api.pagar.me/1/customers \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "name=Richard Deschamps" \
-d "email=richard.deschamps@example.com" \
-d "document_number=80802694594" \
-d "gender=M" \
-d "born_at=09-22-2015" \
-d "address[street]=Rua do Richard" \
-d "address[street_number]=808" \
-d "address[neighborhood]=Bairro do Richard" \
-d "address[complementary]=Apartamento 8" \
-d "address[city]=Richardland" \
-d "address[state]=Lordaeron" \
-d "address[zipcode]=80808080" \
-d "address[country]=Lordaeron" \
-d "phone[ddi]=88" \
-d "phone[ddd]=88" \
-d "phone[number]=808080808"
```

```ruby
# Criando um cliente
require 'pagarme'

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

customer = PagarMe::Customer.new({
    "name" => "Richard Deschamps",
	"email" => "richard.deschamps@example.com",
	"document_number" => "80802694594",
	"gender" => "M",
	"born_at" => "09-22-2015",
	"address" => {
		"street" => "Rua do Richard",
		"street_number" => "808",
		"neighborhood" => "Bairro do Richard",
		"complementary" => "Apartamento 8",
		"city" => "Richardland",
		"state" => "Lordaeron",
		"zipcode" => "80808080",
		"country" => "Lordaeron"
	},
	"phone" => {
		"ddi" => "88",
		"ddd" => "88",
		"number" => "808080808"
	}
})

customer.create
```

```php
// Criando um cliente
<?php

require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$customer = new PagarMe_Customer(array(
  	"name" => "Richard Deschamps",
	"email" => "richard.deschamps@example.com",
	"document_number" => "80802694594",
	"gender" => "M",
	"born_at" => "09-22-2015",
	"address" => array(
		"street" => "Rua do Richard",
		"street_number" => "808",
		"neighborhood" => "Bairro do Richard",
		"complementary" => "Apartamento 8",
		"city" => "Richardland",
		"state" => "Lordaeron",
		"zipcode" => "80808080",
		"country" => "Lordaeron"
	),
	"phone" => array(
		"ddi" => "88",
		"ddd" => "88",
		"number" => "808080808"
	)
));

$customer->create();
```

```csharp
// Criando um cliente
PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

Customer customer = new Customer();

customer.Name = "Richard Deschamps";
customer.Email = "richard.deschamps@example.com";
customer.DocumentNumber = "80802694594";
customer.Gender = "M";
customer.BornAt = "09-22-2015";

customer.Address = new Address() {
    Street = "Rua do Richard",
	StreetNumber = "808",
	Neighborhood = "Bairro do Richard"
	Complementary = "Apartamento 8",
	City = "Richardland",
	State = "Lordaeron",
	Zipcode = "80808080"
	Country = "Lordaeron"
};

customer.Phone = new Phone() {
	Ddi = "88"
	Ddd = "88"
	Number = "808080808"
}

customer.Save();
```

#### Exemplo de resposta

```json
{
    "addresses": [
        {
            "city": "Richardland",
            "complementary": "Apartamento 8",
            "country": "Lordaeron",
            "id": 30264,
            "neighborhood": "Bairro do Richard",
            "object": "address",
            "state": "Lordaeron",
            "street": "Rua do Richard",
            "street_number": "808",
            "zipcode": "80808080"
        }
    ],
    "born_at": "2015-11-22T02:00:00.000Z",
    "date_created": "2016-05-16T21:04:33.218Z",
    "document_number": "80802694594",
    "document_type": "cpf",
    "email": "richard.deschamps@example.com",
    "gender": "M",
    "id": 64912,
    "name": "Richard Deschamps",
    "object": "customer",
    "phones": [
        {
            "ddd": "88",
            "ddi": "88",
            "id": 29717,
            "number": "808080808",
            "object": "phone"
        }
    ]
}
```

### Retornar um cliente

Através da rota `/customers/{id}` você recebe todos os dados do seu cliente, previamente cadastrado na realização de uma transação, quando os dados deste é passado pelos parâmetros `customer[nomeDaPropriedade]`.

Parâmetro | Descrição
---|---
`id` (**Obrigatório**) | Id do cliente

```endpoint
GET /customers/{id}
```

#### Exemplo de requisição

```curl
# Retornando um cliente
curl -X GET https://api.pagar.me/1/customers/64912 \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x"
```

```ruby
# Retornando um cliente
require 'pagarme'

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

customer = PagarMe::Customer.find_by_id(64912)
```

```php
// Retornando um cliente
<?php

require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$customer = PagarMe_Customer::findById(64912);
```

```csharp
// Retornando um cliente
PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

var customer = PagarMeService.GetDefaultService().Customers.Find(64912);
```

#### Exemplo de resposta

```json
{
    "addresses": [
        {
            "city": "Richardland",
            "complementary": "Apartamento 8",
            "country": "Lordaeron",
            "id": 30264,
            "neighborhood": "Bairro do Richard",
            "object": "address",
            "state": "Lordaeron",
            "street": "Rua do Richard",
            "street_number": "808",
            "zipcode": "80808080"
        }
    ],
    "born_at": "2015-11-22T02:00:00.000Z",
    "date_created": "2016-05-16T21:04:33.218Z",
    "document_number": "80802694594",
    "document_type": "cpf",
    "email": "richard.deschamps@example.com",
    "gender": "M",
    "id": 64912,
    "name": "Richard Deschamps",
    "object": "customer",
    "phones": [
        {
            "ddd": "88",
            "ddi": "88",
            "id": 29717,
            "number": "808080808",
            "object": "phone"
        }
    ]
}
```

### Retornar todos os clientes

Retorna todos os clientes cadastrados em sua conta.

Parâmetro | Descrição
---|---
`page` (**Padrão: 1**) | Útil para implementação de uma paginação de resultados
`count` (**Padrão: 10**) | Retorna `n` objetos de `customer`

```endpoint
GET /customers
```

#### Exemplo de requisição

```curl
# Retornando todos os clientes
curl -X GET https://api.pagar.me/1/customers \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "page=1" \
-d "count=1"
```

```ruby
# Retornando todos os clientes
require 'pagarme'

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

customer = PagarMe::Customer.all(1, 1)
```

```php
// Retornando todos os clientes
<?php

require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

$customer = PagarMe_Customer::all(1, 1);
```

```csharp
// Retornando todos os clientes
PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

var customer = PagarMeService.GetDefaultService().Customers.FindAll(1, 1);
```

#### Exemplo de resposta

```json
[
    {
        "addresses": [
            {
                "city": "Richardland",
                "complementary": "Apartamento 8",
                "country": "Lordaeron",
                "id": 30265,
                "neighborhood": "Bairro do Richard",
                "object": "address",
                "state": "Lordaeron",
                "street": "Rua do Richard",
                "street_number": "808",
                "zipcode": "80808080"
            }
        ],
        "born_at": "1970-01-01T00:38:12.015Z",
        "date_created": "2016-05-16T21:07:43.748Z",
        "document_number": "80802694594",
        "document_type": "cpf",
        "email": "richard.deschamps@example.com",
        "gender": "M",
        "id": 64913,
        "name": "Richard Deschamps",
        "object": "customer",
        "phones": [
            {
                "ddd": "88",
                "ddi": "88",
                "id": 29718,
                "number": "808080808",
                "object": "phone"
            }
        ]
    }
]
```

