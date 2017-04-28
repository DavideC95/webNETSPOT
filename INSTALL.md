# Prerequisiti
Per installare laravel bisogna installare PHP, Mysql (o un RDBMS supportato da Laravel), ed un webserver che interpreti PHP.
Questi requisiti si possono installare tramite i software *AMP rispettivamente:

LAMP per Linux
MAMP per Mac
XAMPP/WAMP/EasyPHP o simili per Windows

### -  Linux

Se si ha una distro Debian-based si può installare LAMP tramite i seguenti comandi:

$ sudo apt install tasksel
$ sudo tasksel

Selezionate il meta-pacchetto "LAMP" (usando le freccette e "spazio") andate su "OK" tramite il pulsante TAB

### Mac

È possibile scaricare MAMP da [qui](https://www.mamp.info/en/downloads/) oppure tramite hombrew seguendo [questa guida](https://gist.github.com/alanthing/4089298)

### Windows

Download links per le singole alternative
[EasyPHP](http:/venerdì, 28. aprile 2017 12:18 
/www.easyphp.org/download.php)

### Alternative (cross-platform)
[XAMPP](https://www.apachefriends.org/download.html)
[WAMP](http://www.wampserver.com/en/)


# Installare Laravel

Guida per installare laravel per creare dele Restful API con autenticazione sfruttando il pacchetto JWT-Auth
http://shinworld.altervista.org/wordpress/installare-creare-primo-progetto-laravel-jwtauth/

# Installare beanstalkd

```
$ sudo apt install beanstalkd
```

Se si vuole rendere pubblico l'accesso a beanstalkd bisogna modificare l'indirizzo di ascolto da file */etc/default/beanstalkd* asseggando **BEANSTALKD_LISTEN_ADDR=0.0.0.0**

$ sudo nano /etc/default/beanstalkd

## Installare beanstalkd_console

Questo tool è un pannello di amministrazione per visualizzare le code di beanstalkd, [opensource](https://github.com/ptrofimov/beanstalk_console) scritto in PHP.

Esso si può installare tramite composer, tool PHP citato nella guida di installazione per Laravel

```
composer create-project ptrofimov/beanstalk_console -s dev
```
---

Una volta installato si può aprire tramite browser visitando *beanstalkd_console/public/* e si può aggiungere un server (locale in questo caso) tramite "Add Server" con Host localhost e porta 11300 (di default).

---

![beanstalkd_console](doc/beanstalkd_console.png)

---

# Configurare Laravel & Beanstalkd
Tramite il tool composer è possibile aggiungere pacchetti/dipendenze ad un progetto, in questo a noi torna utile il pacchetto pheanstalk, un beanstalkd client scirtto in PHP che permette a Laravel di connettersi al servizio beanstalkd

```
$ composer require pda/pheanstalk
$ composer update
```

Una volta scaricato ed installato, impostiamo beanstalkd come queue driver di laravel tramite il file *app/config/queue.php*
 
```
'default' => 'beanstalkd',
```

Assicuriamoci che nel file **.env** non ci sia QUEUE_DRIVER=default, in caso sostituiamolo con **QUEUE_DRIVER=beanstalkd**


