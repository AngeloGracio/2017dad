<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class User extends Resource
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
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'nickmane' => $this->nickname,
            'admin' => $this->admin,
            'blocked' => $this->blocked,
            'reason_blocked' => $this->reason_blocked,
            'reason_reactivated' => $this->reason_reactivated,
        ];
    }
}
