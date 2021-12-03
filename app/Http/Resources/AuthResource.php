<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AuthResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'user' => [
                'uname' => $this->accessToken->tokenable->uname,
                // 'firstname' => $this->accessToken->tokenable->firstname,
                // 'lastname' => $this->accessToken->tokenable->lastname,
                'name' => $this->accessToken->tokenable->name,
                'type' => $this->accessToken->tokenable->type,
                'status' => $this->accessToken->tokenable->status,
            ],
            'token' => $this->plainTextToken,
            
        ];
    }
}
