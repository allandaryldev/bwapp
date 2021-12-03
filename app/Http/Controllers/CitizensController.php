<?php

namespace App\Http\Controllers;

use App\Models\Citizens;
use App\Http\Requests\StoreCitizensRequest;
use App\Http\Requests\UpdateCitizensRequest;
use App\Http\Resources\Citizensresource;
use App\Filters\CitizensFilter;

class CitizensController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Citizensresource::collection((new CitizensFilter)->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCitizensRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCitizensRequest $request)
    {
        $input = $request->validated();

        $user = Citizens::create($input);

        // sync role here
        // $user->roles()->sync($request->validated()['role']);

        return new Citizensresource($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Citizens  $citizens
     * @return \Illuminate\Http\Response
     */
    public function show(Citizens $citizen)
    {
        return new Citizensresource($citizen);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCitizensRequest  $request
     * @param  \App\Models\Citizens  $citizens
     * @return \Illuminate\Http\Response
     */
    public function update(StoreCitizensRequest $request, Citizens $citizen)
    {
        $input = $request->validated();
        $citizen->update($input);

        return new Citizensresource($citizen);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Citizens  $citizens
     * @return \Illuminate\Http\Response
     */
    public function destroy(Citizens $citizen)
    {
        $citizen->delete();

        return response()->noContent();
    }
}
