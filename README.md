# EthTTT- "If This Then That" for Ethereum 
https://www.ethttt.com
_Automate your favorite on-chain activities! No coding necessary. #EthDenver 2019 Submission_

## This is currently under development :warning:
You should 1. **Use a testnet** and 2. Use a public/private keypair **WITHOUT** a balance of Main Net Ether.

## Description
EthTTT aims to be the "If This Then That" of Ethereum. A user should be able to define a "trigger" with conditions for which an "action" would fire. Both triggers and actions can be on or off-chain event. We've since learned of projects such as [@MaticNetwork's](https://github.com/maticnetwork) [Zapier](https://matic.network/dagger/zapier/) integration and [EthVelcro](https://kauri.io/article/172e228b2e7d4beaa59c0a49a027ef1e/v1/ethvelcro)(another EthDenver Submission).

[EthDenver Submission Link on Kauri](https://kauri.io/article/472179d37d274fb6b67f999a457d87b0/v2/eth-this-then-that-(ifttt-for-ethereum)) 

**Examples:**
* If there's a large transfer of your favorite token, send a text notification to my phoneGet notified if there's a large transfer of your favorite token! 
* If my CDP is approaching liquidation, then top off my CDP.
* If the price of Ethereum drops below $300, then trade my ether for dai.
* If a DAO I participate in starts a vote, then send a text notification to my phone.

## Guiding Principles
1. To allow non-developers to define their own no-code triggers and actions
2. To allow developers to contribute new triggers and actions. 


## Work In Progress
Triggers | Inputs | Status
------------- | ------------- | -------------
| Ether price limit (low)| limitPrice | :white_check_mark:|
| Ether price limit (high) | limitPrice | :soon:
| Block Number | blockNumber| :soon:


|Actions | Inputs | Status| 
------------- | ------------- | -------------
Transfer Ether | toAddress, privateKey | :white_check_mark:
Send SMS Text  | phoneNumber, msg | :soon:

## Architecture
EthTTT is built on the [serverless framework](https://www.npmjs.com/package/serverless). Serverless is a framework for deploy AWS Lambda functions, along with the AWS infrastructure resources they require (we use DynamoDB). Although our team is admittedly new to serverless, it seemed to be an ideal use case for running cron jobs and composing tasks from trigger-action pairs. 

We refer to "If" conditions as `Triggers` and "Then" conditions as `Actions`. `Triggers` and `Actions` are combined to compose a new `Task`. 

## How to run locally:
1. `npm i`
2. `npm i serverless -g` (recommended) 
3. `npm run deploy`

## Contributors
Started by [@corbpage](https://twitter.com/corbpage) [@conroydave](https://twitter.com/conroydave) [@iamchrissmith](https://twitter.com/iamchrissmith), [@pakaplace](https://twitter.com/Parker_Place) and [@jdstorey_](https://twitter.com/johnDanger_)

| [<img src="https://avatars0.githubusercontent.com/u/1858017?s=400&v=4" width="100px;" alt="Corbin Page"/><br /><sub><b>Corbin Page</b></sub>](https://twitter.com/corbpage)<br />[💻](https://github.com/kentcdodds/eththisthenthat/if-be/commits?author=kentcdodds "Code") | [<img src="https://avatars2.githubusercontent.com/u/2646310?s=400&v=4" width="100px;" alt="John Danger Storey"/><br /><sub><b>John Danger Storey</b></sub>](https://twitter.com/johnDanger_)<br />[💻](https://github.com/eththisthenthat/if-be/commits?author=johndangerstorey "Code") | [<img src="https://avatars3.githubusercontent.com/u/1408372?s=400&v=4" width="100px;" alt="Chris Smith"/><br /><sub><b>Chris Smith</b></sub>]()<br />[💻](https://github.com/eththisthenthat/if-be?author=iamchrissmith "Code") | [<img src="https://avatars0.githubusercontent.com/u/19257612?s=460&v=4" width="100px;" alt="Parker Place"/><br /><sub><b>Parker Place</b></sub>](https://twitter.com/pakaplace)<br />[💻](https://github.com/pakaplace/eththisthenthat/if-be/commits?author=pakaplace "Code") 📖 | [<img src="https://avatars3.githubusercontent.com/u/4235274?s=400&v=4" width="100px;" alt="David Conroy"/><br /><sub><b>David Conroy</b></sub>](http://twitter.com/dconroy)<br />[💻](https://github.com/eththisthenthat/if-be/commits?author=dconroy "Code") | 
| :---: | :---: | :---: | :---: | :---: | 


