## Antecipações

### Objeto bulk_anticipation

Propriedade | Tipo | Descrição
---|---|---
`anticipatable_volume_percentage` | `integer` | Porcentagem do valor passível de antecipação que será antecipado automaticamente

#### Exemplo do objeto

```json
```

### Criar uma antecipação

Com essa rota você consegue criar um pedido de antecipação dos seus recebíveis.

Parâmetro | Descrição
---|---
`recipient_id` (**Obrigatório**) | Id do recebedor
`payment_date` (**Obrigatório**) | Data que você deseja receber a antecipação em sua conta Pagar.me no formato Unix Timestamp
`timeframe` | O período de onde os recebíveis serão escolhidos. `start` define recebíveis próximos, perto de serem pagos e `end` define recebíveis longes, no final de todos recebíveis que você possui para receber. **Valores possíveis:** `start` e `end`. **Obrigatório caso não seja passado o parâmetro `payables_ids`**
`requested_amount` | Valor líquido em centavos que você deseja receber de antecipação. **Obrigatório caso não seja passado o parâmetro `payables_ids`**
`build` **(Padrão: false)** | Define se a antecipação está sendo criada ou atualizada ou vai diretamente para a aprovação do Pagar.me caso o valor seja `false`
`payables_ids` | Lista de payables para antecipar

**Atenção**

**Caso você deseje alterar a antecipação após confirmar, você tem 5 minutos antes que a antecipação building seja destruída automaticamente**

```endpoint
POST /recipients/{recipient_id}/bulk_anticipations
```

#### Exemplo de requisição

```curl
# Criando uma antecipação
curl -X POST https://api.pagar.me/1/recipients/re_cim2ikkfy000hyg6dsfa3uotl/bulk_anticipations \
-u "ak_test_e1QGU2gL98MDCHZxHLJ9sofPUFJ7tH:x" \
-d "payment_date=1464663600000" \
-d "timeframe=start" \
-d "requested_amount=100000" \
-d "build=false"
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

```
