import bcrypt from 'bcryptjs';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';

const LOCAL_STORAGE_USERS_KEY = 'devdeakin_mock_users';

const getMockUsers = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveMockUser = (user) => {
  const users = getMockUsers();
  users.push(user);
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
};

/**
 * Register a new user
 * Hashes the password using bcrypt and stores into Firestore 'users' collection.
 */
export async function registerUser({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  if (isFirebaseConfigured && db) {
    // Check if user already exists in Firestore
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', normalizedEmail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error('An account with this email already exists. Please log in.');
    }

    // Encrypt password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save to Firestore
    const docRef = await addDoc(usersRef, {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    return {
      id: docRef.id,
      name: name.trim(),
      email: normalizedEmail,
    };
  } else {
    // Fallback if .env Firebase keys are not yet provided
    console.warn(
      '⚠️ Firebase is not configured in .env. Falling back to local storage for testing. Add your Firebase keys to .env to connect to real Firestore.'
    );
    const mockUsers = getMockUsers();
    const existing = mockUsers.find((u) => u.email === normalizedEmail);
    if (existing) {
      throw new Error('An account with this email already exists. Please log in.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
      id: 'mock-' + Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };
    saveMockUser(newUser);
    return { id: newUser.id, name: newUser.name, email: newUser.email };
  }
}

/**
 * Login user
 * Checks email and password against Firestore database.
 */
export async function loginUser({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  if (isFirebaseConfigured && db) {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', normalizedEmail));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('No account found with this email. Please check your credentials or sign up for a free account.');
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    // Verify bcrypt hash
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      throw new Error('Invalid email or password. Please try again or sign up for a free account.');
    }

    return {
      id: userDoc.id,
      name: userData.name,
      email: userData.email,
    };
  } else {
    console.warn(
      '⚠️ Firebase is not configured in .env. Checking local mock users for testing.'
    );
    const mockUsers = getMockUsers();
    const user = mockUsers.find((u) => u.email === normalizedEmail);

    if (!user) {
      throw new Error('No account found with this email. Please check your credentials or sign up for a free account.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password. Please try again or sign up for a free account.');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
