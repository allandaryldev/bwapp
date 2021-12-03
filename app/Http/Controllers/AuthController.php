<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthFormRequest;
use App\Http\Resources\AuthResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(AuthFormRequest $request)
    {
        $credentials = $request->validated();

        $user = User::whereUname($credentials['uname'])->first();
        if (!$user) {
            return response()->json(
                [
                    "message" => "No Account Associated with this credentials."
                ],
                401
            );
        }
        // check for status here
        if ($user->status == 'in-active') {

            return response()->json(
                [
                    "message" => "Your account in-active please contact your admin."
                ],
                401
            );
        }

        if (!$user || !Hash::check($credentials['password'], $user['password'])) {
            return response()->json(["message" => "Invallid Credentials!"], 422);
        };
        // create token here
        $user = $user->createToken('userToken');

        return new AuthResource($user);
    }

    public function logout(Request $request)
    {
        auth()->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Successfully logged out.'], 204);
    }
}
