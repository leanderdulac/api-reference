## Transações

Através da rota `/transactions` e suas derivadas, você pode criar transações, estornar, capturar, dentre outras atividades relacionadas a estas.

Ao criar ou atualizar uma transação, este será o objeto que você irá receber como resposta em cada etapa do processo de efetivação da transação.

### Objeto transaction

Propriedade | Tipo | Descrição
---|---|---
`object` | `String` | Nome do tipo do objeto criado/modificado.<br />**Valor retornado: **`transaction`
`status` | `String` | Para cada atualização no processamento da transação, esta propriedade será alterada, e o objeto transaction retornado como resposta através da sua URL de postback ou após o término do processamento da ação atual.<br />**Valores possíveis:** `processing`, `authorized`, `paid`, `refunded`, `waiting_payment`, `pending_refund`, `refused`
`refuse_reason` | `String` | Motivo/agente responsável pela validação ou anulação da transação.<br />**Valores possíveis: **`acquirer`, `antifraud`, `internal_error`, `no_acquirer`, `acquirer_timeout`
`status_reason` | `String` | Adquirente responsável pelo processamento da transação.<br />**Valores possíveis: **`development` (em ambiente de testes), `pagarme` (adquirente Pagar.me), `stone`, `cielo`, `rede`, `mundipagg`
`acquirer_response_code` | `String` | Mensagem de resposta do adquirente referente ao status da transação.
`authorization_code` | `String` | Código de autorização retornado pela bandeira.
`soft_descriptor` | `String` | Texto que irá aparecer na fatura do cliente depois do nome da loja.<br />**OBS: **Limite de 13 caracteres.
`tid` | `Ìnteger` | Código que identifica a transação no adquirente.
`nsu` | `Ìnteger` | Código que identifica a transação no adquirente.
`date_created` | `String` | Data de criação da transação no formato ISODate
`date_updated` | `String` | Data de última atualização da transação no formato ISODate
`amount` | `Integer` | Valor em centados do que foi pago
`installments` | `Integer` | Número de parcelas/prestações a serem cobradas
`id` | `Integer` | Código de identificação da transação
`postback_url` | `String` | URL (endpoint) do sistema integrado a Pagar.me que receberá as respostas a cada atualização do processamento da transação
`payment_method` | `String` | Método de pagamento possíveis: `credit_card` e `boleto`
`boleto_url` | `String` | URL do boleto para ser impresso
`boleto_barcode` | `String` | Código de barras do boleto gerado na transação
`boleto_expiration_date` | `String` | Data de vencimento do boleto no formato ISODate
`referer` | `String` | Mostra de onde a transação foi criada.**Valores :**`api_key` ou `encryption_key`.
`ip` | `String` | IP de origem que criou a transção, podendo ser ou do seu cliente (quando criado via checkout ou utilizando card_hash) ou do servidor.
`subscription_id` | `Integer` | Código da assinatura
`phone` | `Object` | Objeto do tipo `phone`.<br />	Mais informações em: [Phone](/#phone) 
`address` | `Object` | Objeto do tipo `address`.<br />	Mais informações em: [Address](/#address) 
`customer` | `Object` | Objeto do tipo `customer`.<br />	Mais informações em: [Customer](/#customer) 
`card` | `Object` | Objeto do tipo `card`.<br />	Mais informações em: [Card](/#card) 
`metadata` | `Object` | Objeto do tipo `metadata`.<br />	Mais informações em: [Metadata](/#metadata)

#### Exemplo:

```json
{
	"object": "transaction",
	"status": "processing",
	"refuse_reason": null,
	"status_reason": "acquirer",
	"acquirer_response_code": null,
	"authorization_code": null,
	"soft_descriptor": "devLindo",
	"tid": null,
	"nsu": null,
	"date_created": "2015-02-25T21:54:56.000Z",
	"date_updated": "2015-02-25T21:54:56.000Z",
	"amount": 310000,
	"installments": 5,
	"id": 184220,
	"cost": 0,
	"postback_url": "http://requestb.in/pkt7pgpk",
	"payment_method": "credit_card",
	"antifraud_score": null,
	"boleto_url": null,
	"boleto_barcode": null,
	"boleto_expiration_date": null,
	"referer": "api_key",
	"ip": "189.8.94.42",
	"subscription_id": null,
	"phone": null,
	"address": null,
	"customer": null,
	"card": {
	"object": "card",
	"id": "card_ci6l9fx8f0042rt16rtb477gj",
	"date_created": "2015-02-25T21:54:56.000Z",
	"date_updated": "2015-02-25T21:54:56.000Z",
	"brand": "mastercard",
	"holder_name": "Richard Deschamps",
	"first_digits": "548045",
	"last_digits": "3123",
	"fingerprint": "HSiLJan2nqwn",
	"valid": null
	},
		"metadata": {
		"nomeData": "Devlindo",
		"idData": 13
	}
}
```