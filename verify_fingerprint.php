<?php
// Verify fingerprint
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process POST data
    $data = json_decode(file_get_contents('php://input'), true);

    // Perform fingerprint verification
    // Replace this with your fingerprint verification logic

    // Example response
    $response = array('status' => 'success', 'message' => 'Fingerprint verified successfully');
    echo json_encode($response);
} else {
    // Handle other request methods (e.g., GET)
    http_response_code(405); // Method Not Allowed
    echo 'Method Not Allowed';
}
?>
