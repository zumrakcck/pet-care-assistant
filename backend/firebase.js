const admin = require("firebase-admin");

function getFirebaseServiceAccountFromEnv() {
  const rawKey = process.env.FIREBASE_KEY;

  if (!rawKey) {
    throw new Error("Missing FIREBASE_KEY environment variable");
  }

  let parsed;
  try {
    parsed = JSON.parse(rawKey);
  } catch (error) {
    throw new Error("FIREBASE_KEY is not valid JSON");
  }

  if (parsed.private_key) {
    parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
  }

  return parsed;
}

const serviceAccount = getFirebaseServiceAccountFromEnv();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
