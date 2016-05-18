## Chave de encriptação

### Objeto card_hash_key

Propriedade | Tipo | Descrição
---|---|---
`date_created` | `string` | Data de criação da chave no formato ISODate
`id` | `integer` | Id da chave de encriptação
`ip` | `string` | IP que originou a requisição
`public_key` | `string` | Chave pública

#### Exemplo do objeto

```json
{
    "date_created": "2016-05-18T04:26:52.013Z",
    "id": 50102,
    "ip": "179.185.132.108",
    "public_key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp7zlS1JltZmgIdFbhcbZ\nBwnQMWDO/kK6HM4Z0RG6fFK2hVMxjyLTBqcHGevx2xk4Ylkm5jOXHrdmFxvwRBAp\n55xbkDPVn6XisIYclGcCFvtXPIKqTsiW60KlZmmcq+bQ4tcCkfUtfXBdD0LMDvvL\nYU9Q/fTKjdVbXV5i6mvC6NzPj3Ek29WyN2J72a/5zStgsp4k9nUOGqfPV731KCWo\nZXLtQ2FCGW9m8HZj7wa0sA4r3W2DiUGukFP6eEwxIk2RjrZH8hRLn9TZk5WY4Y2X\nwwuOACIiV6Buk8e6ECBhIO95NI3ni/fc4XSPHGZT//1QVEn48zqC27Dckec4Fu8s\nWQIDAQAB\n-----END PUBLIC KEY-----\n"
}
```

### Gerar uma chave de encriptação

Caso você queira/precise criar o `card_hash` manualmente, essa rota deverá ser utilizada para obtenção de uma chave pública de encriptação dos dados do cartão de seu cliente.

Saiba mais sobre como criar um `card_hash` [aqui](https://docs.pagar.me/capturing-card-data/).

Parâmetro | Descrição
---|---
`encryption_key` | Chave de encriptação (disponível na sua [Dashboard](https://dashboard.pagar.me))

**Atenção**

**A chave de criptografia só pode ser usada uma vez e expira em 5 minutos.**

```endpoint
GET /transactions/card_hash_key
```

#### Exemplo de requisição

```curl
curl -X GET https://api.pagar.me/1/transactions/card_hash_key \
-u "ek_test_kAKCRHrQhfvpZeXtrrS8SNZrCM1HGi:x"
```

```ruby
# Sem exemplo
```

```php
// Sem exemplo
```

```csharp
// Sem exemplo
```

#### Exemplo de resposta

```json
{
    "date_created": "2016-05-18T04:26:52.013Z",
    "id": 50102,
    "ip": "179.185.132.108",
    "public_key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp7zlS1JltZmgIdFbhcbZ\nBwnQMWDO/kK6HM4Z0RG6fFK2hVMxjyLTBqcHGevx2xk4Ylkm5jOXHrdmFxvwRBAp\n55xbkDPVn6XisIYclGcCFvtXPIKqTsiW60KlZmmcq+bQ4tcCkfUtfXBdD0LMDvvL\nYU9Q/fTKjdVbXV5i6mvC6NzPj3Ek29WyN2J72a/5zStgsp4k9nUOGqfPV731KCWo\nZXLtQ2FCGW9m8HZj7wa0sA4r3W2DiUGukFP6eEwxIk2RjrZH8hRLn9TZk5WY4Y2X\nwwuOACIiV6Buk8e6ECBhIO95NI3ni/fc4XSPHGZT//1QVEn48zqC27Dckec4Fu8s\nWQIDAQAB\n-----END PUBLIC KEY-----\n"
}
```
