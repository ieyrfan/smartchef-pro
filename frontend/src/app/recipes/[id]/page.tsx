'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';

export default function RecipeDetail() {
  const params = useParams();
  const { id } = params;
  
  const [recipe, setRecipe] = useState<any>(null);
  const [prices, setPrices] = useState<any>(null);
  const [nutrition, setNutrition] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check Auth
    const userStr = localStorage.getItem('user');
    let user = null;
    if (userStr) {
      try { user = JSON.parse(userStr); } catch (e) {}
    }

    // Mock fetching a recipe from DB
    setTimeout(() => {
      const isPremium = id === '1'; // Let's say recipe 1 is premium

      if (isPremium && (!user || user.tier !== 'PREMIUM')) {
        setError('PREMIUM_REQUIRED');
        return;
      }

      setRecipe({
        id,
        title: id === '1' ? 'Authentic Nasi Lemak' : 'Chicken Rendang',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
        author: 'Chef Wan',
        servings: 4,
        prepTime: '45 mins',
        ingredients: [
          { id: 'chicken_whole', name: 'Whole Chicken', grams: 500 },
          { id: 'rice_white', name: 'White Rice', grams: 300 },
          { id: 'coconut_milk', name: 'Coconut Milk', grams: 200 },
          { id: 'chili_red', name: 'Red Chili', grams: 100 },
          { id: 'onion_red', name: 'Red Onion', grams: 150 },
        ],
        instructions: [
          'Wash and prep all ingredients.',
          'Cook the rice with coconut milk and pandan leaves.',
          'Fry the chicken until golden brown.',
          'Blend chilies and onions to make the sambal paste.',
          'Simmer sambal until oil separates and serve.'
        ]
      });
    }, 1000);
  }, [id]);

  useEffect(() => {
    if (!recipe) return;

    // Fetch Prices (data.gov.my cache)
    fetch('https://1yum1w15qk.execute-api.us-east-1.amazonaws.com/all-prices')
      .then(res => res.json())
      .then(data => setPrices(data))
      .catch(err => console.error(err));

    // Fetch Nutrition (USDA/DB)
    fetch('https://1yum1w15qk.execute-api.us-east-1.amazonaws.com/nutrition', {
      method: 'POST',
      body: JSON.stringify({ ingredients: recipe.ingredients, servingSize: recipe.servings })
    })
      .then(res => res.json())
      .then(data => setNutrition(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

  }, [recipe]);

  if (error === 'PREMIUM_REQUIRED') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="card max-w-md w-full p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-warning/20 text-warning rounded-full flex items-center justify-center mx-auto text-3xl">
            ⭐
          </div>
          <h2 className="text-2xl font-bold text-text">Premium Recipe</h2>
          <p className="text-gray-600">
            This recipe is reserved for SmartChef Pro Premium members. Upgrade your account to unlock this and hundreds of other authentic recipes!
          </p>
          <div className="pt-4 flex flex-col gap-3">
            <Link href="/pricing" className="btn-primary w-full">Upgrade to Premium</Link>
            <Link href="/recipes" className="text-gray-500 hover:text-primary transition-colors">Back to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Calculate logistics multiplier from fuel price
  let logisticsMultiplier = 1.0;
  if (prices?.fuel_prices?.[0]?.ron95) {
    const ron95 = prices.fuel_prices[0].ron95;
    logisticsMultiplier = 1.0 + Math.max(0, (ron95 - 2.05) * 0.15);
  }

  // Calculate total cost
  let totalCost = 0;
  recipe.ingredients.forEach((ing: any) => {
    // We would look up exact price from prices.ingredient_prices, but for MVP we use base static or random
    totalCost += (ing.grams / 100) * 2.5; 
  });
  const finalCost = totalCost * logisticsMultiplier;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Head>
        <title>{recipe.title} - SmartChef Pro</title>
      </Head>
      
      {/* Hero Image Section */}
      <div className="relative h-80 w-full">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 w-full max-w-5xl mx-auto">
          <Link href="/recipes" className="text-white/80 hover:text-white mb-4 inline-flex items-center gap-2">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{recipe.title}</h1>
          <p className="text-gray-200 text-lg">By {recipe.author} • {recipe.prepTime} • {recipe.servings} Servings</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content (Ingredients & Instructions) */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-text mb-4">Ingredients</h2>
            <ul className="divide-y divide-gray-100">
              {recipe.ingredients.map((ing: any, idx: number) => (
                <li key={idx} className="py-3 flex justify-between items-center text-gray-700">
                  <span className="font-medium">{ing.name}</span>
                  <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm">{ing.grams}g</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-bold text-text mb-4">Instructions</h2>
            <ol className="space-y-6">
              {recipe.instructions.map((step: string, idx: number) => (
                <li key={idx} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <p className="text-gray-700 mt-1 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>

        </div>

        {/* Sidebar (Live API Data) */}
        <div className="space-y-6">
          
          {/* Smart Cost Predictor (data.gov.my) */}
          <div className="card bg-gradient-to-br from-white to-orange-50 border-orange-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📈</span>
              <h3 className="font-bold text-lg text-text">Live Cost Predictor</h3>
            </div>
            
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Base Cost</span>
                  <span className="font-medium">RM {totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-orange-200 pb-2">
                  <span className="text-gray-600">Live RON95 (Delivery)</span>
                  <span className="font-medium text-orange-600">
                    RM {prices?.fuel_prices?.[0]?.ron95 || '2.05'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-gray-800">Total Est. Cost</span>
                  <span className="font-bold text-xl text-primary">RM {finalCost.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Powered by data.gov.my (PriceCatcher & FuelPrice)
                </p>
              </div>
            )}
          </div>

          {/* Nutritional Info Calculator */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🥑</span>
              <h3 className="font-bold text-lg text-text">Nutrition / Serving</h3>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-2 gap-4 animate-pulse">
                {[1,2,3,4].map(i => <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>)}
              </div>
            ) : nutrition?.per_serving ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Calories</div>
                  <div className="font-bold text-xl text-gray-800">{Math.round(nutrition.per_serving.kcal)}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Protein</div>
                  <div className="font-bold text-xl text-blue-600">{Math.round(nutrition.per_serving.protein)}g</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Carbs</div>
                  <div className="font-bold text-xl text-orange-500">{Math.round(nutrition.per_serving.carbs)}g</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Fat</div>
                  <div className="font-bold text-xl text-red-500">{Math.round(nutrition.per_serving.fat)}g</div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Nutritional data unavailable.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
