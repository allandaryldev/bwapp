<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthController,
    CitizensController,
    UsersController,
    CounterController
};
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return new \App\Http\Resources\UsersResource($request->user());
});

Route::group([
    'middleware' => ['api'],
    'prefix' => 'v1/'
], function () {
    Route::post('/login',  [AuthController::class, 'login']);

    Route::group([
        // 'middleware' => ['auth:sanctum','checkIsClient'],
        'middleware' => ['auth:sanctum'],
    ], function () {
        Route::get('/logout',  [AuthController::class, 'logout']);
        Route::get('/counter',CounterController::class);

        Route::apiResources([
            'citizens' => CitizensController::class,
        ]);
    });
});
