**Node Js**
programming lan x
technology x
framework x
library x

it's js runtime environment. basically google V8 engine's c++ code is wrapped using js,which then connects with the outer js code which we write and makes the server.

npm init -> package.json -> details about the project

npm - node package manager (before) later just used as npm

node js core me jo installed aata hai that is called module
npm se download krte hai jo wo hota hai package
dependencies - packages and packages ki dependencies
devdependencies - the packages that only used in developement purpose.

**Express**
it's a npm package
it's a framework
manages everything from receiving the req and giving the response 

**middleware**
software that acts as a "runner" or "bridge" between different applications or components, allowing them to communicate and share data seamlessly.

humlog kuch bhi data frontend par browser par rakh sakte hai and jab bhi aap kuch bhi request backend par karoge wo FE par saved data automaticaally backend par chala jaayega

**MongoDB**
Bcakend contains 2 servers- 
1.Application Server(ex:Node)-handles routes,accepts req and all
2.Database Server(ex:MongoDB)- works only for checking data

Database -> Collections(different types of data in database(eg:sales data,user data))->Document(single data of a collection(eg: a single users data))

CODE                    DATABASE
---------------------------------------
mongoose.connect ->      database create
model create    ->      collection
CREATE          ->      document

all mongoose codes are asynchronus.

**Authentication & Authorization**
1. cookie
2. bycrypt
3. jwt