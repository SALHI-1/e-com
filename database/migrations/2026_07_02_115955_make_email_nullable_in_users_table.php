<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Supprimer la contrainte unique existante avant de modifier la colonne
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['email']);
        });

        // Rendre l'email nullable
        DB::statement('ALTER TABLE users ALTER COLUMN email DROP NOT NULL');

        // Recréer l'index unique en excluant les valeurs NULL (PostgreSQL)
        DB::statement('CREATE UNIQUE INDEX users_email_unique ON users (email) WHERE email IS NOT NULL');
    }

    public function down(): void
    {
        // Supprimer l'index partiel
        DB::statement('DROP INDEX IF EXISTS users_email_unique');

        // Remettre NOT NULL
        DB::statement('ALTER TABLE users ALTER COLUMN email SET NOT NULL');

        // Recréer la contrainte unique standard
        Schema::table('users', function (Blueprint $table) {
            $table->unique('email');
        });
    }
};
