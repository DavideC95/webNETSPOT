<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['middleware' => ['api'],'prefix' => 'api'], function () {
    Route::post('register',   'authController@register');
    Route::post('login',      'authController@login');

    Route::group(['middleware' => 'jwt-auth'], function () {
        Route::post('get_user_details', 'authController@get_user_details');
    });
});

Route::get('route_job', 'SigSpotController@requestJob');
Route::get('output',    'SigSpotController@outputFile');
