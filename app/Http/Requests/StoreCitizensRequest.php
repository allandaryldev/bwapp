<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCitizensRequest extends FormRequest
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
            'name' => 'required|string',
            'age' => 'sometimes|integer',
            'gender' => 'required|string',
            'body_temp' => 'required',
            'mobile_no' => 'sometimes', 'unique:users,mobile_no,' . request('id'),
            "diagnosed" => 'required',
            "encountered" => 'required',
            "vacinated" => 'required',
            "nationality" => 'sometimes'
        ];
    }
}
