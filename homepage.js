import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAMmQgE0j32w75Yr6oNQAtBuYEMlpWovUQ",
    authDomain: "bus-ticketing-system-9facd.firebaseapp.com",
    projectId: "bus-ticketing-system-9facd",
    storageBucket: "bus-ticketing-system-9facd.firebasestorage.app",
    messagingSenderId: "327503526123",
    appId: "1:327503526123:web:29c262cf2cc7b01577a6ae",
    measurementId: "G-LTVNTM02TE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User logged in:", user);

        const userId = user.uid; // Get Firebase user UID
        try {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('loggedUserFName').innerText = userData.firstName || "N/A";
                document.getElementById('loggedUserLName').innerText = userData.lastName || "N/A";
                document.getElementById('loggedUserEmail').innerText = userData.email || "N/A";
            } else {
                console.log("No user document found in Firestore.");
            }
        } catch (error) {
            console.error("Error retrieving user data:", error);
        }
    } else {
        console.log("No user logged in, redirecting...");
        window.location.href = 'index.html'; // Redirect if not logged in
    }
});

// Logout functionality
document.getElementById('logout').addEventListener('click', async () => {
    try {
        await signOut(auth);
        console.log("User signed out.");
        window.location.href = 'index.html';
    } catch (error) {
        console.error("Error signing out:", error);
    }
});
