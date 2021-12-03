<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UsersResource extends JsonResource
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
            'uname' => $this->uname,
            'fullname' => $this->fullname,
            'decentname' => $this->decentname,
            'fname' => $this->fname,
            'lname' => $this->lname,
            'email' => $this->email ? $this->email : "",
            // 'role' => $this->role ? $this->role->name : 'No role',
            // 'role_id' => $this->role ? $this->role->id : null,
            'type' => $this->type,
            'status' => $this->status
        ];
    }
}
