## Códigos postais

### Consulta de CEP

Com essa rota você pode verificar os dados de um determinado CEP.

```endpoint
GET /zipcodes/{zipcode}
```

#### Exemplo de requisição

```curl
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
