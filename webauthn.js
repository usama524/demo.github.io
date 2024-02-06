// Example of calling ajax function in verifyFingerprintCredential
verifyFingerprintCredential: (credential) => {
    let data = {
        credential: JSON.stringify(credential)
    };

    helper.ajax('verify_fingerprint.php', data, (response) => {
        console.log('Verification response:', response);
        // Handle verification response as needed
    });
}
var helper = {
    // (A) AJAX FETCH
    // Update the ajax function in webauthn.js
ajax: (url, data, after) => {
    // Convert data to FormData
    let formData = new FormData();
    for (let [key, value] of Object.entries(data)) {
        formData.append(key, value);
    }

    // Send a POST request to the specified URL
    fetch(url, {
        method: 'POST', // Use POST method
        body: formData // Use FormData as the request body
    })
    .then(response => response.text())
    .then(responseData => after(responseData))
    .catch(error => {
        alert('An error occurred while making the request');
        console.error('Request failed:', error);
    });
}

};

function loginWithFingerprint() {
    // Perform WebAuthn login
    const options = {
        publicKey: {
            challenge: new Uint8Array(32),
            allowCredentials: [] // Add stored credentials if any
        }
    };

    navigator.credentials.get(options)
        .then((credential) => {
            // Send credential data to the server for verification
            // Actual implementation depends on your backend
            verifyFingerprintCredential(credential);
        })
        .catch((error) => {
            console.error("WebAuthn login with fingerprint failed:", error);
        });
}




function loginWithUsernamePassword() {
    var username = prompt("Enter your username:");
    var password = prompt("Enter your password:");

    // Perform login with username/password
    // You can implement server-side logic to validate username and password

    alert("Performing login with username/password. Actual implementation needed.");
}

function register() {
    // Perform WebAuthn registration
    const options = {
        publicKey: {
            user: {
                id: new Uint8Array(16),
                name: "John Doe",
                displayName: "john.doe@example.com"
            },
            challenge: new Uint8Array(32),
            rp: {
                name: "WebAuthn Demo",
                id: window.location.hostname
            },
            pubKeyCredParams: [
                { type: "public-key", alg: -7 }, // ES256
                { type: "public-key", alg: -257 } // RS256
            ],
            authenticatorSelection: {
                authenticatorAttachment: "platform",
                requireResidentKey: false,
                userVerification: "preferred"
            },
            attestation: "none"
        }
    };

    navigator.credentials.create({ publicKey })
  .then((credential) => {
    console.log("Credential ID:", credential.id);
    const publicKey = credential.response.getPublicKey(); // This is not a standard API method
    console.log("Public Key:", publicKey);
  })
  .catch((error) => {
    console.error("WebAuthn error:", error);
  });}

//     navigator.credentials.create({ publicKey: options.publicKey })
//         .then((credential) => {
//             // Send credential data to the server for storage
//             // Actual implementation depends on your backend
//             alert("WebAuthn registration successful. Send data to server for storage.");

//         })
//         .catch((error) => {
//             console.error("WebAuthn registration failed:", error);
//         });
// }





function showWelcomePage(method) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('welcomePage').style.display = 'block';
    document.getElementById('welcomeMessage').innerText = `Welcome! You have successfully logged in using ${method}.`;
}
