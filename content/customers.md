## Clientes

### Objeto customer

Ao criar um customer, esse será o objeto que irá guardar suas informações.

Propriedade        | Tipo      | Descrição
---                | ---       | ---
`object`           | `String`  | Nome do tipo do objeto criado/modificado.
`document_number`  | `String`  | Número do CPF ou CNPJ do cliente
`document_type`    | `String`  | Tipo do documento do cliente
`name`             | `String`  | Data de nascimento do cliente
`email`            | `String`  | E-mail do cliente
`born_at`          | `Date`    | Data de nascimento do cliente no formato ISODate
`gender`           | `String`  | Gênero do cliente
`date_created`     | `Date`    | Data de criação do cliente no formato ISODate
`id`               | `Integer` | Id do cliente
`phones`     | `Array[Object]`   | Lista de telefones do cliente
`addresses`  | `Array[Object]`   | Lista de endereços do cliente

#### Exemplo de objeto

```json
{
    "addresses": [
        {
            "city": "Cidade",
            "complementary": "Apartamento 8",
            "country": "Lordaeron",
            "id": 30264,
            "neighborhood": "Bairro de exemplo",
            "object": "address",
            "state": "Lordaeron",
            "street": "Rua de exemplo",
            "street_number": "808",
            "zipcode": "80808080"
        }
    ],
    "born_at": "2015-11-22T02:00:00.000Z",
    "date_created": "2016-05-16T21:04:33.218Z",
    "document_number": "80802694594",
    "document_type": "cpf",
    "email": "example@exampl.com",
    "gender": "M",
    "id": 64912,
    "name": "Name",
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
### Objeto phone

Ao criar um customer, é nesse objeto que ficam os dados referentes aos seus numeros de telefone.

Propriedade | Tipo | Descrição
---|---|---
`object` | `String` | Nome do objeto criado
`ddi` | `String` | Número do DDI do telefone
`ddd` | `String` | Numero do DDD do telefone
`number` | `String` | Numero do telefone do cliente
`id` | `Integer` | Id gerado pelo sistema para o telefone criado


#### Exemplo do objeto

```json
{
     "ddi": "88",
     "id": 29717,
     "number": "808080808",
     "object": "phone"
}
```

### Objeto address

o criar um customer, é nesse objeto que ficam os dados referentes aos seus endereços.

Parâmetros | Tipo | Descrição
---|---|---
`object` | `String` | Nome do objeto criado
`street` | `String` | Logradouro do cliente
`complementary` | `String` | Complemento do endereço do cliente
`street_number` | `String` | Numero do endereço do cliente
`neighborhood` | `String` | Bairro do cliente
`city` | `String` | Cidade do endereço do cliente
`state` | `String` | Estado do endereço do cliente
`zipcode` | `String` | CEP do cliente
`country` | `String` | País do endereço do cliente

### Criar um cliente

Através dessa rota você pode salvar os dados de um cliente no nosso banco de dados.

Parâmetro                                       | Tipo     | Descrição
---                                             | ---      | ---
`api_key` | `String` | Chave da API, disponivel em seu Dashboard
`name` <br /> **Obrigatório**                   | `String` | Nome ou razão social do cliente
`email` <br /> **Obrigatório**                  | `String` | E-mail do cliente
`document_number`                               | `String` | Número do CPF ou CNPJ do cliente
`gender`                                        | `String` | Gênero do cliente
`born_at`                                       | `String` | Data de nascimento do cliente
`address[street]` <br /> **Obrigatório**        | `String` | Nome da rua do cliente
`address[street_number]` <br /> **Obrigatório** | `String` | Número da rua do cliente
`address[neighborhood]` <br /> **Obrigatório**  | `String` | Bairro do cliente
`address[complementary]`                        | `String` | Complemento do endereço
`address[city]`                                 | `String` | Cidade do cliente
`address[state]`                                | `String` | Estado do cliente
`address[zipcode]` <br /> **Obrigatório**       | `String` | Código postal (CEP) do cliente
`address[country]`                              | `String` | País do cliente
`phone[ddi]`                                    | `String` | DDI (Discagem Direta Internacional)
`phone[ddd]` <br /> **Obrigatório**             | `String` | DDD (Discagem Direta à Distância)
`phone[number]` <br /> **Obrigatório**          | `String` | Número do telefone (máximo de 9 dígitos, apenas números)

```endpoint
POST /customers
```

#### Exemplo de requisição

```curl
# Criando um cliente
curl -X POST https://api.pagar.me/1/customers \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "name=Name" \
-d "email=example@example.com" \
-d "document_number=80802694594" \
-d "gender=M" \
-d "born_at=09-22-2015" \
-d "address[street]=Rua de exemplo" \
-d "address[street_number]=808" \
-d "address[neighborhood]=Bairro de exemplo" \
-d "address[complementary]=Apartamento 8" \
-d "address[city]=Cidade" \
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
    name: "Name",
	email: "example@example.com",
	document_number: "80802694594",
	gender: "M",
	born_at: "09-22-2015",
	address: {
		street: "Rua de exemplo",
		street_number: "808",
		neighborhood: "Bairro de exemplo",
		complementary: "Apartamento 8",
		city: "Cidade",
		state: "Lordaeron",
		zipcode: "80808080",
		country: "Lordaeron"
	},
	phone: {
		ddi: "88",
		ddd: "88",
		number: "808080808"
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
  	"name" => "Name",
	"email" => "example@example.com",
	"document_number" => "80802694594",
	"gender" => "M",
	"born_at" => "09-22-2015",
	"address" => array(
		"street" => "Rua de exemplo",
		"street_number" => "808",
		"neighborhood" => "Bairro de exemplo",
		"complementary" => "Apartamento 8",
		"city" => "Cidade",
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

customer.Name = "Name";
customer.Email = "example@example.com";
customer.DocumentNumber = "80802694594";
customer.Gender = "M";
customer.BornAt = "09-22-2015";
customer.Address = new Address() {
    Street = "Rua de exemplo",
	StreetNumber = "808",
	Neighborhood = "Bairro de exemplo"
	Complementary = "Apartamento 8",
	City = "Cidade",
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
            "city": "Cidade",
            "complementary": "Apartamento 8",
            "country": "Lordaeron",
            "id": 30264,
            "neighborhood": "Bairro de exemplo",
            "object": "address",
            "state": "Lordaeron",
            "street": "Rua de exemplo",
            "street_number": "808",
            "zipcode": "80808080"
        }
    ],
    "born_at": "2015-11-22T02:00:00.000Z",
    "date_created": "2016-05-16T21:04:33.218Z",
    "document_number": "80802694594",
    "document_type": "cpf",
    "email": "example@example.com",
    "gender": "M",
    "id": 64912,
    "name": "Name",
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

Através da rota `/customers/{id}` você recebe todos os dados do seu cliente, previamente cadastrado na realização de uma transação, quando os dados deste são passados pelos parâmetros `customer[nomeDaPropriedade]`.

Parâmetro | Tipo  | Descrição
---|---|---
`api_key` | `String` | Chave da API, disponivel em seu Dashboard
`id` <br /> **Obrigatório** | `String` | Id do cliente

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
            "city": "Cidade",
            "complementary": "Apartamento 8",
            "country": "Lordaeron",
            "id": 30264,
            "neighborhood": "Bairro de exemplo",
            "object": "address",
            "state": "Lordaeron",
            "street": "Rua de exemplo",
            "street_number": "808",
            "zipcode": "80808080"
        }
    ],
    "born_at": "2015-11-22T02:00:00.000Z",
    "date_created": "2016-05-16T21:04:33.218Z",
    "document_number": "80802694594",
    "document_type": "cpf",
    "email": "example@example.com",
    "gender": "M",
    "id": 64912,
    "name": "Name",
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

Parâmetro | Tipo | Descrição
---|---|---
`api_key` | `String` | Chave da API, disponivel em seu Dashboard
`page` <br /> **Padrão: 1** | `Integer` | Útil para implementação de uma paginação de resultados
`count` <br /> **Padrão: 10** | `Integer` | Retorna `n` objetos de `customer`

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
                "city": "Cidade",
                "complementary": "Apartamento 8",
                "country": "Lordaeron",
                "id": 30265,
                "neighborhood": "Bairro de exemplo",
                "object": "address",
                "state": "Lordaeron",
                "street": "Rua de exemplo",
                "street_number": "808",
                "zipcode": "80808080"
            }
        ],
        "born_at": "1970-01-01T00:38:12.015Z",
        "date_created": "2016-05-16T21:07:43.748Z",
        "document_number": "80802694594",
        "document_type": "cpf",
        "email": "example@example.com",
        "gender": "M",
        "id": 64913,
        "name": "Name",
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

