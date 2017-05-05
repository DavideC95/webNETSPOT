# Prerequisiti

- [AMP (Apache2, MySQL, PHP)](#installare-amp)
- [composer](https://getcomposer.org/doc/00-intro.md)
- [Beanstalkd](#installare-beanstalkd-1)
- [Supervisor](#supervisor-1)


## Installare AMP

Per installare laravel bisogna installare PHP, MySQL (o un RDBMS supportato da Laravel), un webserver che interpreti PHP.
Questi requisiti si possono installare tramite i software **\*AMP** rispettivamente:

- LAMP per Linux
- MAMP per Mac
- XAMPP/WAMP/EasyPHP o simili per Windows

### -  Linux

Se si ha una distro Debian-based si può installare LAMP tramite i seguenti comandi:
```
$ sudo apt install tasksel
$ sudo tasksel
```

Selezionate il meta-pacchetto "LAMP" (usando le freccette e "spazio") andate su "OK" tramite il pulsante TAB

### - Mac

È possibile scaricare MAMP da [qui](https://www.mamp.info/en/downloads/) oppure tramite hombrew seguendo [questa guida](https://gist.github.com/alanthing/4089298)

### - Windows

Download links per le singole alternative
[EasyPHP](http:/venerdì, 28. aprile 2017 12:18 
/www.easyphp.org/download.php)

### Alternative (cross-platform)
- [XAMPP](https://www.apachefriends.org/download.html)
- [WAMP](http://www.wampserver.com/en/)

# Installare beanstalkd

```
$ sudo apt install beanstalkd
```

Se si vuole rendere pubblico l'accesso a beanstalkd bisogna modificare l'indirizzo di ascolto da file */etc/default/beanstalkd* asseggando **BEANSTALKD_LISTEN_ADDR=0.0.0.0**

```
$ sudo nano /etc/default/beanstalkd
```

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

# Supervisor

Per automatizzare l'esecuzione dei job di laravel, bisogna installare il servizio supervisord:

**Linux**
```
$ sudo apt install supervisor
```

**[Mac](https://gist.github.com/fadhlirahim/78fefdfdf4b96d9ea9b8)**
```
$ sudo pip install supervisor
```

Creiamo una cartella dove tenere i logs del servizio supervisord:
```
$ sudo touch /var/log/supervisor.log
```

Successivamente creiamo un file di conf *(queue.conf)* della nostra queue in **/etc/supervisor/conf.d/queue.conf**

```
[program:queue]
command=php artisan queue:listen --tries=2
directory=/var/www/html/webnetspot/backend
stdout_logfile=/var/log/supervisor.log
redirect_stderr=true
```

Avviamo supervisord ed aggiungiamo il nuovo file di conf (queue.conf):
```
$ sudo supervisorctl reread
$ sudo supervisorctl add queue
```

Avviamo il programma definito nel nostor queue.conf
```
$ sudo supervisorctl start queue
```

# Installare Laravel

[Creare un progetto Laravel da 0](http://shinworld.altervista.org/wordpress/installare-creare-primo-progetto-laravel-jwtauth/)

## Installare il progetto Laravel presente su webnetspot

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

Configurare le credenziali per la connessione al database, quindi, copiare il file .env.example rinominandolo in .env ed inserendo i parametri richiesti:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nome_database
DB_USERNAME=username
DB_PASSWORD=password
```

Assicurarsi che nel file .env il parametro APP_KEY non sia vuoto, altrimenti eseguire:
```
php artisan key:generate
```

Assicurarsi che nel file **.env** non ci sia *QUEUE_DRIVER=default*, in caso sostituirla con **QUEUE_DRIVER=beanstalkd**

Per testare se Laravel è stato installato correttamente andare su  http://localhost/yourPrj/public/index.php


---

## Configurare Laravel per Beanstalkd
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


## [Creare un job su laravel](https://laravel.com/docs/5.4/queues#creating-jobs)

Se NON hai installato Laravel da 0 non hai bisogno di creare un Job, poichè il Job è già presente nella repository webnetspot.

[Commit dove sono svolte le seguenti indicazioni](https://github.com/IamTask/webNETSPOT/commit/ad5f0c503f0e887552b798b4b450e421fcd4be05)

Per prima cosa, per lavorare con le queue è necessario creare un "job" ovvero una classe che svolgerà una determinata "richiesta", un determinato "lavoro di esecuzione", un job.
Questa classe la creeremo su app/Jobs/ tramite artisan.php un tool all'interno di laravel, quindi eseguiamolo da riga di comando con:

```
php artisan make:job SigSpot
```

*SigSpot* sarà il nome della classe, quindi del job, ed anche del file.

Questa classe di default avrà un metodo __construct(), che è appunto il costruttore della classe, ed il metodo handle(), metodo che verrà eseguito all'esecuzione del job.

Esempio di Job con attributo "$path":

```
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SigSpot implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

		protected $path;

    /*
     * @return void
     */
    public function __construct($path)
    {
        $this->path = $path;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        exec("cd '/file/path/JavaProject_Netspot'; java -cp lib/GraphLib.jar:lib/meden.jar:lib/oplall.jar:lib/Refine.jar:. SigSpot wikipedia990.quadruples 10 10 output/" . $this->path . " > /dev/null 2>/dev/null &");
    }
}
```

Creato il job lo si può eseguire creando la classe SigSpot ed usando la funzione **dispatch()**:
```
$job = (new SigSpot("output.txt"))
            ->onConnection("beanstalkd");

dispatch($job);
```

Per fare un test possiamo creare una route e richiamare questo job da quella route, quindi creiamo un nuovo controller su *app/Http/Controllers/*:

SigSpotController.php
```
<?php
namespace App\Http\Controllers;

use App\Jobs\SigSpot;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SigSpotController extends Controller
{

	public function add() {
		Queue::push('MyQueue', array());
	}

    /**
     * @param  Request  $request
     * @return Response
     */
    public function requestJob(Request $request)
    {

		$job = (new SigSpot("output.txt"))
		->onConnection('beanstalkd');

		dispatch($job);

    }
}
```

Aggiungiamo la route requestJob su **routes/web.php**:


```
Route::get('route_job', 'SigSpotController@requestJob');
```

Quindi visitiamo http://localhost/webnetspot/backend/public/index.php/route_job per testare la route.

Visitando la route "route_job", abbiamo richiesto l'esecuzione del job, quindi nella beanstalk_console vedremo incrementare la **current-jobs-ready**

---

![current jobs ready](doc/job-ready.png)

Per eseguire il job possiamo utilizzare artisan:

```
php artisan queue:work
```

