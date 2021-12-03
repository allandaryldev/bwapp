<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Citizensresource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            "name" => $this->name,
            "gender" => $this->gender,
            "age" => $this->age,
            "mobile_no" => $this->mobile_no ? $this->mobile_no :"",
            "body_temp" => $this->body_temp,
            "diagnosed" => $this->diagnosed ? "YES":"NO",
            "encountered" => $this->encountered ? "YES":"NO",
            "vacinated" => $this->vacinated ? "YES":"NO",
            "nationality" => $this->nationality,
        ];
    }
}
