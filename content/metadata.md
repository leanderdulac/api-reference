## Metadata

O campo `metadata` está presente em recursos como [Transações](/#transactions), [Assinaturas](/#subscriptions). Ele é útil porque você pode armazenar dados adicionais como: `ids do seu sistema`, `informações sobre os pedidos` e outras coisas.

Metadata não é usado pelo Pagar.me (ex: para aprovar ou negar transações), e não vai ser visto para o seu usuário a menos que você mostre para eles.

Exemplos de uso: 

- Vincular ID's do seu sistema.
- Informações sobre clientes, como: Nome completo.
- Informações sobre pedidos, como: Local de um evento ou horário.

#### Exemplo:

```json
{
	"metadata": {
		"id_do_pedido": 1234,
		"nome_do_cliente": "Richard Deschamps"
	}
}
```

### Atenção

**Você precisa manter os tipos dos dados que você inserir.**
