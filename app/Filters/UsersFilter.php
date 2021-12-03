<?php

namespace App\Filters;

use App\Models\User;
use App\Filters\Interfaces\Filterable;

class UsersFilter implements Filterable
{

    public function get()
    {

        return User::query()
            ->when(request('fullname'), function ($query) {
                $query->where('fname', 'LIKE', "%" . request('fullname') . "%")
                ->orWhere('lname', 'LIKE', "%" . request('fullname') . "%");
            })
            ->when(request('type'), function ($query) {
                $query->where('type', request('type'));
              })
              ->when(request('status'), function ($query) {
                $query->where('status', request('status'));
              })
            ->orderBy(
                request('order_by', 'id'), // column
                request('direction', 'desc') // direction
              )
            ->paginate(request('size', 10));
    }
}
