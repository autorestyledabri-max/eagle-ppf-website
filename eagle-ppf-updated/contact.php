<?php
/**
 * contact.php — enquiry form ka server-side handler (Hostinger / koi bhi PHP host).
 * ---------------------------------------------------------------------------
 * Frontend ise POST karta hai (assets/js/data.js -> DATA.forms.serverEndpoint).
 * Yahan koi password ya API key nahi hai. Mail hosting ke apne mail server se
 * jaata hai, isliye FROM address isi domain ka hona chahiye.
 *
 * SETUP (Hostinger hPanel me):
 *   1. Emails -> Email Accounts -> banao: website@eagleppf.in
 *   2. Neeche $MAIL_FROM me wahi address daalo
 *   3. $MAIL_TO me wo inbox jahan enquiry chahiye
 * Bas. Koi aur configuration nahi.
 * ---------------------------------------------------------------------------
 */

$MAIL_TO   = 'Eagleppf@gmail.com';               // enquiry yahan aayegi
$MAIL_FROM = 'website@eagleppf.in';              // domain ka apna address hona chahiye
$SITE_NAME = 'Eagle PPF';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function reply($code, $payload) {
    http_response_code($code);
    echo json_encode($payload);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    reply(405, ['ok' => false, 'error' => 'Use POST']);
}

$raw = file_get_contents('php://input');
if (strlen($raw) > 8000) {
    reply(413, ['ok' => false, 'error' => 'Payload too large']);
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;                 // normal form post ke liye fallback
}
if (!is_array($data) || !count($data)) {
    reply(400, ['ok' => false, 'error' => 'Invalid request body']);
}

// Honeypot — bots isme bhar dete hain, asli log kabhi nahi
if (!empty($data['_gotcha'])) {
    reply(200, ['ok' => true]);
}

$labels = [
    'enquiry_type' => 'Enquiry type',
    'name'         => 'Name',
    'phone'        => 'Phone',
    'email'        => 'Email',
    'company'      => 'Company',
    'city'         => 'City',
    'business'     => 'Current business',
    'volume'       => 'Expected volume',
    'vehicle'      => 'Vehicle',
    'product'      => 'Product of interest',
    'requirement'  => 'Requirement',
    'message'      => 'Message',
    'page'         => 'Submitted from',
];

$required = ['name', 'phone', 'email', 'message'];
$missing  = [];
foreach ($required as $key) {
    if (trim((string) ($data[$key] ?? '')) === '') {
        $missing[] = $key;
    }
}
if ($missing) {
    reply(422, ['ok' => false, 'error' => 'Missing fields', 'fields' => $missing]);
}

$fromEmail = trim((string) $data['email']);
if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
    reply(422, ['ok' => false, 'error' => 'Invalid email', 'fields' => ['email']]);
}

// Header injection se bachav — newline wale fields reject
foreach (['name', 'email', 'phone'] as $key) {
    if (preg_match('/[\r\n]/', (string) ($data[$key] ?? ''))) {
        reply(422, ['ok' => false, 'error' => 'Invalid characters']);
    }
}

$type    = (($data['enquiry_type'] ?? '') === 'distributor')
    ? 'Distributor application'
    : 'Quote request';
$name    = trim((string) $data['name']);
$subject = $type . ' - ' . $name;

$lines = [];
$rows  = '';
foreach ($labels as $key => $label) {
    $value = trim((string) ($data[$key] ?? ''));
    if ($value === '') {
        continue;
    }
    $lines[] = $label . ': ' . $value;
    $rows .= '<tr><td style="padding:8px 14px;border-bottom:1px solid #e6e6e6;color:#666;font:14px system-ui">'
        . htmlspecialchars($label, ENT_QUOTES, 'UTF-8')
        . '</td><td style="padding:8px 14px;border-bottom:1px solid #e6e6e6;font:14px system-ui"><b>'
        . htmlspecialchars($value, ENT_QUOTES, 'UTF-8')
        . '</b></td></tr>';
}

$ip   = $_SERVER['REMOTE_ADDR'] ?? '';
$html = '<div style="max-width:620px;margin:0 auto;font:15px system-ui;color:#111">'
    . '<p style="font:600 13px system-ui;letter-spacing:.12em;text-transform:uppercase;color:#E01A22">'
    . htmlspecialchars($SITE_NAME, ENT_QUOTES, 'UTF-8') . ' website</p>'
    . '<h2 style="margin:6px 0 18px;font:700 22px system-ui">' . htmlspecialchars($type, ENT_QUOTES, 'UTF-8') . '</h2>'
    . '<table style="width:100%;border-collapse:collapse;border:1px solid #e6e6e6">' . $rows . '</table>'
    . '<p style="margin-top:18px;color:#777;font-size:13px">Received ' . gmdate('D, d M Y H:i') . ' UTC'
    . ($ip ? ' &middot; IP ' . htmlspecialchars($ip, ENT_QUOTES, 'UTF-8') : '') . '</p></div>';

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . $SITE_NAME . ' Website <' . $MAIL_FROM . '>',
    'Reply-To: ' . $name . ' <' . $fromEmail . '>',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = @mail($MAIL_TO, $subject, $html, implode("\r\n", $headers));

if (!$sent) {
    // mail() block ho to enquiry kho na jaye — file me likh do
    @file_put_contents(
        __DIR__ . '/enquiries.log',
        gmdate('c') . " | " . implode(' | ', $lines) . "\n",
        FILE_APPEND | LOCK_EX
    );
    reply(502, ['ok' => false, 'error' => 'Mail service unavailable']);
}

reply(200, ['ok' => true]);
