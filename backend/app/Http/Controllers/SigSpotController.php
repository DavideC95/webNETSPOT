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

			// $path = $request->input("path");

			$job = (new SigSpot("output.txt"))

			dispatch($job);

			->onConnection('beanstalkd');
			$job_col["stato"] = "ready";
			$job_col["filename"] = "output.txt"; //path
			$job_table = DB::table("Jobs")->insert($job_col)->get();

			//$asd = DB::table("Jobs")->wher("ID", 1)->insert($update);

			echo "done!";

    }
}
