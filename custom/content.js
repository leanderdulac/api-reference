var fs = require('fs');

/**
 * This file exports the content of your website, as a bunch of concatenated
 * Markdown files. By doing this explicitly, you can control the order
 * of content without any level of abstraction.
 *
 * Using the brfs module, fs.readFileSync calls in this file are translated
 * into strings of those files' content before the file is delivered to a
 * browser: the content is read ahead-of-time and included in bundle.js.
 */
module.exports =
  '# Introdução\n' +
  fs.readFileSync('./content/introduction.md', 'utf8') + '\n' +
  '# Tópicos\n' +
  fs.readFileSync('./content/authentication.md', 'utf8') + '\n' +
  fs.readFileSync('./content/metadata.md', 'utf8') + '\n' +
  fs.readFileSync('./content/errors.md', 'utf8') + '\n' +
  '# Transacional\n' +
  fs.readFileSync('./content/operations.md', 'utf8') + '\n' +
  fs.readFileSync('./content/antifraud.md', 'utf8') + '\n' +
  fs.readFileSync('./content/payables.md', 'utf8') + '\n' +
  '# Market Place\n' +
  fs.readFileSync('./content/bank_accounts.md', 'utf8') + '\n' +
  fs.readFileSync('./content/recipients.md', 'utf8') + '\n' +
  '# Formas de Pagamento\n' +
  fs.readFileSync('./content/cards.md', 'utf8') + '\n' +
  '# Recursos\n' +
  fs.readFileSync('./content/customers.md', 'utf8') + '\n' +
  fs.readFileSync('./content/balance.md', 'utf8') + '\n' +
  fs.readFileSync('./content/balance_operations.md', 'utf8') + '\n' +
  fs.readFileSync('./content/transfers.md', 'utf8') + '\n' +
  '# Geral\n' +
  fs.readFileSync('./content/events.md', 'utf8') + '\n' +
  fs.readFileSync('./content/postback.md', 'utf8') + '\n' +
  fs.readFileSync('./content/card_hash_key.md', 'utf8') + '\n' +
  fs.readFileSync('./content/zipcodes.md', 'utf8') + '\n' +
  fs.readFileSync('./content/elasticsearch.md', 'utf8')
