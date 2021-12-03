<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Citizens;

class CounterController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //encounter
        // vacainated
        // fever > 38 body_temp
        // adult  age > 18
        // minor  age < 18
        // foreinger

        $encountered = Citizens::where('encountered', true)->count();
        $diagnosed = Citizens::where('diagnosed', true)->count();
        $vacinated = Citizens::where('vacinated', true)->count();
        $foreigner = Citizens::where('nationality', '!=', 'filipino')->count();
        $adult = Citizens::where('age', '>=', '18')->count();
        $minor = Citizens::where('age', '<', '18')->count();
        $fever = Citizens::where('body_temp', '>=', '38')->count();
        $data = array(
            "diagnosed" => array(
                "title" => "diagnosed",
                "count" => $diagnosed
            ),
            "encountered" => array(
                'title' => "Covid-19 Encountered",
                'count' => $encountered
            ),
            "vacinated" => array(
                'title' => "Vacinated",
                'count' => $vacinated
            ),
            "fever" => array(
                'title' => "Fever",
                'count' => $fever
            ),
            "adult" => array(
                'title' => "adult",
                'count' => $adult
            ),
            "minor" => array(
                'title' => "minor",
                'count' => $minor
            ),
            "foreigner" => array(
                'title' => "foreigner",
                'count' => $foreigner
            ),
        );
        return $data;
    }
}
