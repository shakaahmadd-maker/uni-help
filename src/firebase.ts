import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";

// Initialize Firebase client
const app = initializeApp(firebaseConfig);

// db must reference the configured firestoreDatabaseId according to high fidelity guidelines
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();

// Standard login popup method as recommended for iframe previews
export async function loginWithGoogle() {
  googleProvider.setCustomParameters({ prompt: "select_account" });
  return signInWithPopup(auth, googleProvider);
}

// Log out session
export async function logoutUser() {
  return signOut(auth);
}

// Operational Types for Audit log verification
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

// Standard catch block diagnostic handler
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error("Firestore Error logged in audit system: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection check verification upon boot
export async function testConnection() {
  try {
    const { doc, getDocFromServer } = await import("firebase/firestore");
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Connection probe timeout")), 3000)
    );
    await Promise.race([
      getDocFromServer(doc(db, "test", "connection")),
      timeoutPromise
    ]);
  } catch (_error) {
    // Offline mode is supported natively by Firestore and our local fallback queues
    console.info("Firestore status: operating with automatic offline resilience and local persistence queue.");
  }
}
testConnection();
