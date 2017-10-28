<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Jobs\SigSpot;

class SigSpotController extends Controller
{

	public function add() {
		Queue::push('MyQueue', array());
	}

  /*
   * @param  Request  $request
   * @return Response
   */
  public function requestJob(Request $request)
  {

		// $path = $request->input("path");

		$job = (new SigSpot("output.txt"))->onConnection('beanstalkd');

		dispatch($job);
		$job_col["status"] = "ready";
		$job_col["filename"] = "output.txt"; //path
		$job_col["id_user"] = "0";
		$job_table = DB::table("jobs")->insert($job_col);

		return "done";
  }

	public function outputFile() {
    $output = file_get_contents('/var/www/html/webnetspot/netspot/output/output.txt');
    $exp = explode("\n", $output);
		$region = array();
		$score = array();
		$data = array();

		$jsonText = array();
		for ($i = 0; $i< count($exp)-1; $i++) {

			if (strpos($exp[$i],"Region")) {
				$region = explode(" ", explode("Region: ", $exp[$i])[1])[0];
				$score = explode(" ", explode("Score: ", $exp[$i])[1])[0];

				$jsonText[] = array("region" => $region, "score" => $score, "rows" => array());
			}
			else if ($exp[$i] != "") {
				$last = count($jsonText)-1;
				$jsonText[$last]["rows"][] = explode(", ",$exp[$i]);
			}

		}

		return response()->json($jsonText);
  }
}
