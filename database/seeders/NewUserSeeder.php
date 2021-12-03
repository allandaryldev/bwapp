<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class NewUserSeeder extends Seeder
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
                'fname' => 'super',
                'lname' => 'admin',
                'uname' => 'super@admin',
                'password' => Hash::make('password'),
                'type' => 'admin',
                'status' => 'active'
            ],
        ];
        User::insert($user);
    }
}
