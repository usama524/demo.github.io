var helper = {
    // (A) AJAX FETCH
    ajax: (url, data, after) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                after(xhr.responseText);
            }
        };

        let formData = Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key])).join('&');
        xhr.send(formData);
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

function verifyFingerprintCredential(credential) {
    // Send credential data to the server for verification
    // Actual implementation depends on your backend
    helper.ajax("verify_fingerprint.php", { credential: credential }, (response) => {
        if (response === "ValidUser") {
            showWelcomePage("Fingerprint");
        } else {
            alert("Fingerprint login failed. Please try another method.");
        }
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

    navigator.credentials.create({ publicKey: options.publicKey })
        .then((credential) => {
            // Send credential data to the server for storage
            // Actual implementation depends on your backend
            alert("WebAuthn registration successful. Send data to server for storage.");

        })
        .catch((error) => {
            console.error("WebAuthn registration failed:", error);
        });
}





function showWelcomePage(method) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('welcomePage').style.display = 'block';
    document.getElementById('welcomeMessage').innerText = `Welcome! You have successfully logged in using ${method}.`;
}
