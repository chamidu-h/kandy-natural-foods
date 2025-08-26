import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminDashboard from '../components/admin/AdminDashboard';

const AdminPage = () => {
  return (
    <div>
      <Helmet>
        <title>Admin Dashboard | Your Sweet Shop Name</title>
        <meta name="robots" content="noindex" /> {/* Prevents search engines from indexing this page */}
      </Helmet>
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
