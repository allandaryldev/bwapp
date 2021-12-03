<?php

namespace App\Filters;

use App\Models\Citizens;
use App\Filters\Interfaces\Filterable;

class CitizensFilter implements Filterable
{

    public function get()
    {

        return Citizens::query()
            ->when(request('name'), function ($query) {
                $query->where('name', 'LIKE', "%" . request('fullname') . "%");
            })
            ->orderBy(
                request('order_by', 'id'), // column
                request('direction', 'desc') // direction
              )
            ->paginate(request('size', 10));
    }
}
