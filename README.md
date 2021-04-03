# CallData

a [Sails v1](https://sailsjs.com) application

## Overview

CallData is service for Callchain recent data. It is now used for CallWallet and CallExplorer. Anyone can deploy this project and provide api service for Callchain applications.

Production CallData api url: [http://data.callcahin.live](http://data.callchain.cc)

## Gettting started

```
node app.js
```

## Interfaces

1. Latest Blocks

```js
/blocks/latest
```

Get latest 10 blocks for client.

2. Latest Transactions

```js
/transactions/latest
```

Get latest 10 transactions for client.

3. Latest Price

```js
/price/latest/:pair
```

Get latest price information for trade pair. trade pair format is as `base_counter`.

## License

See LICENSE file in this project.