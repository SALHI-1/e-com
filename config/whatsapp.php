<?php

return [
    /*
    |--------------------------------------------------------------------------
    | WhatsApp Cloud API (Meta)
    |--------------------------------------------------------------------------
    */

    'api_url'         => env('WHATSAPP_API_URL', 'https://graph.facebook.com/v20.0'),
    'phone_number_id' => env('WHATSAPP_PHONE_NUMBER_ID'),
    'access_token'    => env('WHATSAPP_ACCESS_TOKEN'),
    'verify_token'    => env('WHATSAPP_VERIFY_TOKEN', 'my_verify_token'),
];
