## Erros

Os possíveis erros retornados da API são:

`invalid_parameter`: quando algum parâmetro passado está incorreto/faltando.

`action_forbidden`: quando o usuário não tem permissão para fazer determinada ação.

`internal_error`: quando algum erro interno em nosso servidor ocorreu.

`not_found`: quando o recurso procurado não foi encontrado/não existe.

#### Exemplo:

```json
{
    "errors": [{
        "type": "invalid_parameter",
        "parameter_name": "api_key",
        "message": "api_key está faltando"
    }],
    "url": "/transactions",
    "method": "get"
}
```
