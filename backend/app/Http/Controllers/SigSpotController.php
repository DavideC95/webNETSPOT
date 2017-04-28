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
		
		echo "done!";

    }
}
