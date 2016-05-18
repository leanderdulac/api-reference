## Autenticação

Para autenticar sua conta usando nossa API você precisa passar sua API key na requisição [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol). Você pode gerenciar suas API keys na nossa [Dashboard](https://dashboard.pagar.me/#/myaccount/apikeys). Suas API keys carregam muitos privilegios, então você precisa tomar muito cuidado para manter elas em segredo. Não compartilhe elas em lugares públicos como GitHub, códigos que vão para os navegadores dos clientes e outros meios.

A autenticação com nossa API é feita via [HTTP Basic Auth](https://en.wikipedia.org/wiki/Basic_access_authentication). Coloque sua API key como o **username** do método de autenticação Basic Auth e no campo **password** você precisa colocar apenas `x`.

O `username:password` precisam ser codificados usando [Base64](https://en.wikipedia.org/wiki/Base64).

**Nota:** Caso você use alguma das nossas bibliotecas, elas vão prover uma forma de autenticar facilmente.

Todas as requisições devem ser feitas através de uma conexão [HTTPS](https://en.wikipedia.org/wiki/HTTPS). Requisições usando HTTP vão falhar. Requisições sem autenticação também vão falhar.

Uma API key de teste está incluida em todos os exemplos dessa página, então você pode testar qualquer exemplo. Para testar usando sua conta, substitua a API key de exemplo pela sua API key de testes.

#### Exemplo:

```http
Authorization: Basic ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x
```
#### Exemplo:

```curl
# Autenticando usando Basic HTTP
curl -X POST -H "Authorization: Basic YWtfdGVzdF9lMVFHVTJnTDk4TURDSFp4SExKOXNvZlBVRko3dEg6eA==" https://api.pagar.me/1/transactions

# Autenticando usando a flag -u
curl -X POST https://api.pagar.me/1/transactions \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x"

# curl usa a flag -u para passar as credenciais do Basic Auth (adicionando um :x no final previne que uma senha seja requisitada).
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH"

# Definindo dessa forma a sua API key estará disponível em todos os objetos dessa biblioteca
```

```php
<?php

require("pagarme-php/Pagarme.php");

Pagarme::setApiKey("ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH");

// Definindo dessa forma a sua API key estará disponível em todos os objetos dessa biblioteca
```

```csharp
PagarMeService.DefaultApiKey = "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH";

// Definindo dessa forma a sua API key estará disponível em todos os objetos dessa biblioteca
```

**Atenção**

**A sua API key é privada e não pode ser compartilhada em nenhum lugar além dos seus servidores e ambientes seguros. Qualquer ação da nossa API pode ser feita com sua API key, até mesmo estornar uma transação já feita e com produto entregue. Mantenha ela sempre em segredo e mostre para seus clientes que você se preocupa com a segurança deles.**
