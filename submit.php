<?php
// submit.php

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Отримання даних з POST-запиту
    $firstName = isset($_POST['firstName']) ? trim($_POST['firstName']) : '';
    $lastName = isset($_POST['lastName']) ? trim($_POST['lastName']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';

    // Валідація даних (можна розширити)
    if ($firstName && $lastName && $phone && $email) {
        // Формування рядка з роздільником табуляції
        $line = "$firstName\t$lastName\t$phone\t$email\n";

        // Запис у файл
        $file = 'data/registrations.tsv';
        if (!file_exists('data')) {
            mkdir('data', 0755, true);
        }
        if (file_put_contents($file, $line, FILE_APPEND | LOCK_EX)) {
            // Успішний запис
            echo json_encode(['message' => 'Реєстрація успішно відправлена!']);
        } else {
            // Помилка запису
            http_response_code(500);
            echo json_encode(['message' => 'Помилка при записі даних.']);
        }
    } else {
        // Неповні дані
        http_response_code(400);
        echo json_encode(['message' => 'Будь ласка, заповніть усі поля.']);
    }
} else {
    // Невірний метод запиту
    http_response_code(405);
    echo json_encode(['message' => 'Метод не дозволено.']);
}
?>
