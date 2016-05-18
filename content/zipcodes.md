## Códigos postais

### Objeto zipcodes

Propriedade | Tipo | Descrição
---|---|---
`neighborhood` | `string` | Bairro
`street` | `string` | Rua
`city` | `string` | Cidade
`state` | `string` | Estado
`zipcode` | `string` | Código postal (CEP)

#### Exemplo do objeto

```json
{
    "neighborhood": "Jardim Paulistano",
    "street": "Avenida Brigadeiro Faria Lima",
    "city": "São Paulo",
    "state": "SP",
    "zipcode": "01452001"
}
```

### Consulta de CEP

Com essa rota você pode verificar os dados de um determinado CEP.

```endpoint
GET /zipcodes/{zipcode}
```

#### Exemplo de requisição

```curl
# Retornando informações sobre um CEP
curl -X GET https://api.pagar.me/1/zipcodes/01452001
```

#### Exemplo de resposta

```json
{
    "neighborhood": "Jardim Paulistano",
    "street": "Avenida Brigadeiro Faria Lima",
    "city": "São Paulo",
    "state": "SP",
    "zipcode": "01452001"
}
```
