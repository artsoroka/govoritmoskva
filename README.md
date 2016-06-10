# GovoritMoskva telegram bot 

### Requirements 
* node.js 4.0 and above 
* MySQL or [MariaDB](http://mariadb.com) or [Postgres](http://postgresql.org) 
* public url with https enabled 

### Installation 

Clone repostory and install dependencies 
```
$ git clone https://github.com/artsoroka/govoritmoskva
$ cd govoritmoskva 
$ npm intall 
```
### Configuration  
Update ```/config``` directory or set your environment variables with ```.env``` file 
* GMBOT_HOSTNAME=public_url_is_used_for_webhook 
* GMBOT_PORT=8080
* GMBOT_TG_TOKEN=your_telegram_token
* GMBOT_DB_HOST=127.0.0.1
* GMBOT_DB_USER=db_user
* GMBOT_DB_PSWD=db_user_password
* GMBOT_DB_NAME=gmbot

Default logger is ```console```, but you can also configure [papertrail](http://papertrailapp.com) service and enable log targets by updating ```/config/log.js``` file  

```
output: ['console', 'papertrail'] 
```

* GMBOT_PT_HOST=logs123.papertrailapp.com
* GMBOT_PT_PORT=12345
* GMBOT_PT_HOSTNAME=your_server_name
* GMBOT_PT_PROGRAM=gmbot 

### Running migrations 

With Database credentials set up you can now run migrations

```
$ npm run db:migrations 
```

### Fire up your server 

Run ```$ npm start ``` 

```start``` command uses [PM2](https://github.com/Unitech/pm2), so you can monitor your app instance with ```pm2``` diractly or use ```npm run status``` command 

### Debug tips 

Sometimes it is useful to check Knex step by step log

Export ```DEBUG=knex:tx``` to your environment variables 