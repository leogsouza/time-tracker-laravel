<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // We want to delete the users table if it exists before running the seed
        DB::table('users')->delete();

        $users = array(
                ['name' => 'Leonardo Souza', 'email' => 'leogsouza@gmail.com', 'password' => Hash::make('test')],
                ['name' => 'User1 Test', 'email' => 'user1@test.com', 'password' => Hash::make('test')],
                ['name' => 'User2 Test', 'email' => 'user2@test.com', 'password' => Hash::make('test')],
                ['name' => 'User3 Test', 'email' => 'user3@test.com', 'password' => Hash::make('test')],
        );
            
        // Loop through each user above and create the record for them in the database
        foreach ($users as $user)
        {
            User::create($user);
        }
    }
}
