<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCitizensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('citizens', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('gender',['male','female']);
            $table->smallInteger('age');
            $table->string('mobile_no')->unique()->nullable();
            $table->decimal('body_temp');
            $table->boolean('diagnosed')->default(false);
            $table->boolean('encountered')->default(false);
            $table->boolean('vacinated')->default(false);
            $table->string('nationality')->nullable()->default('filipino');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('citizens');
    }
}
