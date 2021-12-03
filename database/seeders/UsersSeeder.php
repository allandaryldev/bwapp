<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = [
            [
                'fname' => 'Allan',
                'lname' => 'Daryl',
                'uname' => 'dev@allan',
                'password' => Hash::make('password'),
                'type' => 'developer',
                'status' => 'active'
            ],
        ];
        User::insert($user);
    }
}
