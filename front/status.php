<?php

$ch = curl_init(!getenv("DEV_MODE") ? "https://movistar-api.raul.md/metrics" : "http://192.168.0.3:3000/metrics");

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Accept: application/json',
));

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);

$output = curl_exec($ch);

$response = [
    "success" => false,
    "data" => [],
];
header('Content-Type: application/json');

if ($output === false || (curl_getinfo($ch, CURLINFO_HTTP_CODE) !== 200 && curl_getinfo($ch, CURLINFO_HTTP_CODE) !== 500)) {
    http_response_code(503);
    $response["data"]["error"] = "Failed to fetch data from backend";
} else {
    $json = json_decode($output);
    http_response_code(curl_getinfo($ch, CURLINFO_HTTP_CODE));
    $response = $json;
}

echo json_encode($response, JSON_PRETTY_PRINT);
