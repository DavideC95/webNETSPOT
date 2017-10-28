# Requirements

- **AMP** (Apache2, MySQL, PHP)
- [composer](https://getcomposer.org/doc/00-intro.md)
- [Beanstalkd](#install-beanstalkd)
- [Supervisor](#install-supervisor)


## Install AMP

This project to run need: PHP, MySQL, a webserver (like Apache2).
This requirements are satisfied by the software stack ** \*AMP **:

- LAMP for Linux
- MAMP for Mac
- XAMPP/WAMP/EasyPHP and similar for Windows

### -  Linux

In a linux distro debian-based the package tasksel can install the meta-package LAMP easily, so install tasksel with:
```
$ sudo apt install tasksel
$ sudo tasksel
```

Select "LAMP" (use the key arrows and the keybutton "space" to select the option), press TAB and install LAMP.

### - Mac

[Here](https://www.mamp.info/en/downloads/) the download link of MAMP.
MAMP can be installed by [hombrew](https://gist.github.com/alanthing/4089298)

### - Windows

Download [EasyPHP](http://www.easyphp.org/download.php)

### Alternative (cross-platform)
- [XAMPP](https://www.apachefriends.org/download.html)
- [WAMP](http://www.wampserver.com/en/)

# Install beanstalkd
## - Linux
```
$ sudo apt install beanstalkd
```

## - Mac
```
$ brew install beanstalkd
```

## Installare beanstalkd_console

This [opensource](https://github.com/ptrofimov/beanstalk_console) tool is an admin panel written in PHP and will be useful to view the beanstalkd queue.

You can install it by composer:

```
composer create-project ptrofimov/beanstalk_console -s dev
```

---
beanstalkd_console needs phpmbstring. on a distro linux debian-based you can install it with:

```
sudo apt-get install php-mbstring php7.0-mbstring php-gettext libapache2-mod-php7.0
```

---

Affter the installation you can open it by *beanstalkd_console/public/* and you can add the server with "Add Server" with host "localhost" and port "11300".

Troubleshooting for error  "storage.json not writable":

```
chmod 777 storage.json
```

---

![beanstalkd_console](doc/beanstalkd_console.png)

---

# Install Supervisor

To run automatically the laravel jobs, you need the supervisor service.

**Linux**
```
$ sudo apt install supervisor
```

**[Mac](https://gist.github.com/fadhlirahim/78fefdfdf4b96d9ea9b8)**
```
$ sudo pip install supervisor
```

We can make a directory where insert the logs of supervsiord (you also use the backend/storage/logs directory for the logs).
```
$ sudo touch /var/log/supervisor.log
```

Afterwards we need to make a new conf file *(queue.conf)* of our queue in **/etc/supervisor/conf.d/queue.conf**

```
[program:queue]
command=php artisan queue:listen --tries=2
directory=/var/www/html/webnetspot/backend
stdout_logfile=/var/log/supervisor.log
redirect_stderr=true
```

Now start supervisord and add the new conf file (queue.conf):
```
$ sudo supervisorctl reread
$ sudo supervisorctl add queue
```

Start the laravel queue with the command defined in queue.conf (*php artisan queue:listen --tries=2*):
```
$ sudo supervisorctl start queue
```

# Install Laravel

## Install the Laravel project

```
$ cd backend
$ composer install
$ chmod 777 -R storage/
$ chmod 777 -R storage/logs/
$ chmod 777 -R storage/framework/cache
$ chmod 777 -R storage/framework/views
$ chmod 777 -R storage/framework/sessions
$ chmod 777 -R bootstrap/cache
```

Configure the parameters of the enviroment, so copy .env.example content in a new file ".env"

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database_name
DB_USERNAME=username
DB_PASSWORD=password
```

Execute this command to fill the APP_KEY parameter (this key will be used from JWTAuth for the authentication):
```
php artisan key:generate
```

Put **QUEUE_DRIVER=beanstalkd** in the .env file.

To check if Laravel has been installed correctly go to http://localhost/yourPrj/public/index.php

Now load the sql/db_structure.sql file to fill your database and try the authentication with a http post request with the following route and *"username=something&password=somepassword"*

http://localhost/yourPrj/public/index.php/api/register
http://localhost/yourPrj/public/index.php/api/login


---

## Configure Laravel for Beanstalkd
Install the pheanstalk package, a beanstalkd client written in PHP that allows to connect with the beanstalkd service:

```
$ composer require pda/pheanstalk
$ composer update
```

Installed set beanstalkd like queue driver in */config/queue.php*.
 
```
'default' => 'beanstalkd',
```

Remember to configure in the file **.env**, the queue driver

```
QUEUE_DRIVER=beanstalkd
```
