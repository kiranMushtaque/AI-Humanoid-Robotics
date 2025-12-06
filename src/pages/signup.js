
import React from 'react';
import Layout from '@theme/Layout';
import SignupComponent from '../components/Signup';

export default function SignupPage() {
  return (
    <Layout title="Sign Up" description="Create an account to get started.">
      <main>
        <SignupComponent />
      </main>
    </Layout>
  );
}
