<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UsersRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'fname' => 'required|string',
            'mname' => 'somtimes|string',
            'lname' => 'required|string',
            'uname' => 'required|unique:users,username,' . request('id'),
            'email' => 'sometimes|nullable|email|unique:users,email,' . request('id'),
            'type' => 'required|in:admin,developer,staff',
            'status' => 'required|in:active,in-active',
            'password' => 'required|min:8|confirmed',
            'password_confirmation' => 'required|min:8',
        ];
    }
}
