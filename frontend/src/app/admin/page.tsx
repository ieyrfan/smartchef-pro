'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function AdminPanel() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    try {
      const res = await fetch('https://1yum1w15qk.execute-api.us-east-1.amazonaws.com/api-recipes?admin=true');
      const data = await res.json();
      setRecipes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      setError('Unauthorized');
      setLoading(false);
      return;
    }
    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'ADMIN') {
        setError('Unauthorized');
        setLoading(false);
        return;
      }
    } catch (e) {
      setError('Unauthorized');
      setLoading(false);
      return;
    }

    fetchRecipes();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await fetch('https://1yum1w15qk.execute-api.us-east-1.amazonaws.com/api-recipes', {
        method: 'PUT',
        body: JSON.stringify({ recipe_id: id, status })
      });
      fetchRecipes();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8">Loading admin panel...</div>;
  if (error) return <div className="p-8 text-red-500 font-bold">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Head><title>Admin Panel - SmartChef Pro</title></Head>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text">Admin Panel: Review Recipes</h1>
          <Link href="/recipes" className="text-primary hover:underline">Back to Dashboard</Link>
        </div>

        <div className="card p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3">Title</th>
                <th className="py-3">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.length === 0 ? (
                <tr><td colSpan={3} className="py-4 text-center text-gray-500">No recipes found.</td></tr>
              ) : (
                recipes.map(recipe => (
                  <tr key={recipe.recipe_id} className="border-b border-gray-100 last:border-0">
                    <td className="py-3">{recipe.title || 'Untitled'}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        recipe.status === 'APPROVED' ? 'bg-success/20 text-success' : 
                        recipe.status === 'REJECTED' ? 'bg-danger/20 text-danger' : 
                        'bg-warning/20 text-warning'
                      }`}>
                        {recipe.status}
                      </span>
                    </td>
                    <td className="py-3 flex gap-2">
                      <button onClick={() => handleUpdateStatus(recipe.recipe_id, 'APPROVED')} className="text-success hover:underline text-sm font-medium">Approve</button>
                      <button onClick={() => handleUpdateStatus(recipe.recipe_id, 'REJECTED')} className="text-danger hover:underline text-sm font-medium">Reject</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
