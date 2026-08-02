import React, { useState } from 'react';

// Define the User interface
interface User {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  collegeName?: string;
  age?: number | '';
  isProfileComplete: boolean;
}

export default function App() {
  // Demo state
  const [user, setUser] = useState<User>({
    id: '123',
    name: 'Rahul',
    email: 'rahul@example.com',
    mobile: '',
    collegeName: '',
    age: '',
    isProfileComplete: false,
  });

  // Controls whether the user has tapped "Get Started"
  const [hasStarted, setHasStarted] = useState(false);

  const [formData, setFormData] = useState({
    mobile: user.mobile || '',
    collegeName: user.collegeName || '',
    age: user.age || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit profile updates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with your actual backend API call or Firebase update
      // await updateDoc(doc(db, "users", user.id), { ...formData, isProfileComplete: true });

      // Update local state on success
      setUser((prev) => ({
        ...prev,
        ...formData,
        age: Number(formData.age),
        isProfileComplete: true,
      }));
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. STEP 1: LANDING PAGE WITH "GET STARTED" BUTTON
  if (!hasStarted && !user.isProfileComplete) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Habit Tracker</h1>
          <p style={styles.subtitle}>
            Track your daily habits, build consistency, and hit your goals!
          </p>
          <button 
            onClick={() => setHasStarted(true)} 
            style={styles.button}
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  // 2. STEP 2: PROFILE COMPLETION FORM (Triggers when user clicks "Get Started")
  if (!user.isProfileComplete) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Complete Your Profile</h2>
          <p style={styles.subtitle}>
            Welcome! Please fill in your details to start tracking habits.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter 10-digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>College / Institute Name</label>
              <input
                type="text"
                name="collegeName"
                placeholder="Enter your college or institute"
                value={formData.collegeName}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Age</label>
              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                min="10"
                max="100"
                required
                style={styles.input}
              />
            </div>

            <button type="submit" disabled={isSubmitting} style={styles.button}>
              {isSubmitting ? 'Saving...' : 'Save & Continue'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. STEP 3: MAIN HABIT TRACKER DASHBOARD (Shows after profile completion)
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Habit Tracker Dashboard</h1>
        <p style={styles.subtitle}>Welcome back, {user.name}!</p>

        <div style={styles.profileBadge}>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>College:</strong> {user.collegeName}</p>
          <p><strong>Age:</strong> {user.age}</p>
        </div>

        {/* Your main Habit Tracker components go here */}
      </div>
    </div>
  );
}

// Inline CSS Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '24px',
    color: '#333',
  },
  subtitle: {
    margin: '0 0 20px 0',
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    textAlign: 'left',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#444',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    marginTop: '10px',
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
  },
  profileBadge: {
    backgroundColor: '#eef2f5',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '15px',
    fontSize: '14px',
    textAlign: 'left',
  },
};