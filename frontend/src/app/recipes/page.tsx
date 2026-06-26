'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function RecipesDashboard() {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const fetchRecipes = async (query = '') => {
    setLoading(true);
    try {
      const res = await fetch(`https://1yum1w15qk.execute-api.us-east-1.amazonaws.com/api-recipes?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setRecipes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchRecipes(search);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Head>
        <title>Dashboard - SmartChef Pro</title>
      </Head>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">S</div>
            <span className="font-bold text-xl tracking-tight text-text">SmartChef <span className="text-primary">Pro</span></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative">
              <input 
                type="text" 
                placeholder="Search ingredients, cuisines..." 
                value={search}
                onChange={handleSearch}
                onKeyDown={handleSearchSubmit}
                className="bg-gray-100 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64" 
              />
              <span className="absolute right-3 top-2 text-gray-400 cursor-pointer" onClick={() => fetchRecipes(search)}>🔍</span>
            </div>
            <Link href="/recipes/new" className="btn-primary py-1.5 px-4 text-sm hidden sm:block">+ New Recipe</Link>
            <div className="w-9 h-9 rounded-full bg-secondary border-2 border-white shadow-sm flex items-center justify-center text-primary font-bold">U</div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text mb-2">Discover Recipes</h1>
            <p className="text-gray-500">Cook smart with real-time price predictions.</p>
          </div>
          
          <div className="flex gap-2">
            <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Filters</button>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            /* Loading Skeletons */
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-200 w-full"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex justify-between mt-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            recipes.map(recipe => (
              <Link href={`/recipes/${recipe.id}`} key={recipe.id} className="block group">
                <div className="card h-full flex flex-col group-hover:-translate-y-1 transform transition-all duration-300">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {recipe.isPremium && (
                      <div className="absolute top-3 right-3 bg-warning text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        PREMIUM
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-text mb-1 group-hover:text-primary transition-colors">{recipe.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 flex-1">By {recipe.author}</p>
                    
                    <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-3">
                      <div className="flex items-center gap-1 text-gray-600">
                        <span>⏱️</span> {recipe.prepTime}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <span className="text-yellow-400">★</span> {recipe.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>

    </div>
  );
}
