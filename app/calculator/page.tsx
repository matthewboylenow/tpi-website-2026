"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";

type Market = "soft_serve" | "shake" | "cocktail";

interface Equipment {
  name: string;
  multiplier: number;
  image: string;
}

interface ProductConfig {
  id: string;
  title: string;
  emoji: string;
  defaultPrice: number;
  defaultCost: number;
  defaultSales: number;
  defaultTaylorTime: number;
  defaultCompetitorTime: number;
  defaultEnabled: boolean;
  competitorLabel: string;
}

const equipmentData: Record<Market, Record<string, Equipment>> = {
  soft_serve: {
    single: {
      name: "Single Flavor",
      multiplier: 1.0,
      image: "https://taylorproducts.net/wp-content/uploads/2022/04/model_c708.jpg",
    },
    twin: {
      name: "Twin Twist",
      multiplier: 1.08,
      image: "https://taylorproducts.net/wp-content/uploads/2022/04/model_c716.jpg",
    },
    heat: {
      name: "Heat Treatment",
      multiplier: 1.12,
      image: "https://taylorproducts.net/wp-content/uploads/2022/04/model_c717-300x300.jpg",
    },
    combo: {
      name: "Combo Unit",
      multiplier: 1.15,
      image: "https://taylorproducts.net/wp-content/uploads/2022/08/C612-300x300.png",
    },
  },
  shake: {
    "358": {
      name: "Model 358",
      multiplier: 1.0,
      image: "https://taylorproducts.net/wp-content/uploads/2022/04/model_358-300x300.jpg",
    },
    "494": {
      name: "Model 490",
      multiplier: 1.05,
      image: "https://taylorproducts.net/wp-content/uploads/2022/04/model_490-300x300.jpg",
    },
    "428": {
      name: "Model 428",
      multiplier: 1.08,
      image: "https://taylorproducts.net/wp-content/uploads/2022/04/model_428-300x300.jpg",
    },
    "359": {
      name: "Model 359 (Two-Head)",
      multiplier: 1.85,
      image: "https://taylorproducts.net/wp-content/uploads/2022/04/model_359-300x300.jpg",
    },
  },
  cocktail: {
    "428": {
      name: "Model 428",
      multiplier: 1.0,
      image: "https://taylorproducts.net/wp-content/uploads/2022/04/model_428-300x300.jpg",
    },
    "430": {
      name: "Model 430",
      multiplier: 1.05,
      image: "https://taylorproducts.net/wp-content/uploads/2022/04/model_430-300x300.jpg",
    },
    "432": {
      name: "Model 432 (Double-Head)",
      multiplier: 1.85,
      image: "https://taylorproducts.net/wp-content/uploads/2022/04/model_432-300x300.jpg",
    },
    "342": {
      name: "Model 342 (Double-Head)",
      multiplier: 1.9,
      image: "https://taylorproducts.net/wp-content/uploads/2022/04/model_342-300x300.jpg",
    },
  },
};

const productConfigs: Record<Market, ProductConfig[]> = {
  soft_serve: [
    {
      id: "cones",
      title: "Cones",
      emoji: "🍦",
      defaultPrice: 4.0,
      defaultCost: 0.8,
      defaultSales: 80,
      defaultTaylorTime: 10,
      defaultCompetitorTime: 60,
      defaultEnabled: true,
      competitorLabel: "Hard Ice Cream Time",
    },
    {
      id: "cups",
      title: "Cups",
      emoji: "🥤",
      defaultPrice: 4.0,
      defaultCost: 1.1,
      defaultSales: 80,
      defaultTaylorTime: 10,
      defaultCompetitorTime: 60,
      defaultEnabled: true,
      competitorLabel: "Hard Ice Cream Time",
    },
    {
      id: "crunchycream",
      title: "CrunchiCreme / Flavor Burst",
      emoji: "🍬",
      defaultPrice: 5.5,
      defaultCost: 1.2,
      defaultSales: 40,
      defaultTaylorTime: 12,
      defaultCompetitorTime: 45,
      defaultEnabled: false,
      competitorLabel: "Manual Prep Time",
    },
    {
      id: "blendins",
      title: "Blend-Ins",
      emoji: "🍨",
      defaultPrice: 8.0,
      defaultCost: 2.55,
      defaultSales: 30,
      defaultTaylorTime: 20,
      defaultCompetitorTime: 180,
      defaultEnabled: false,
      competitorLabel: "Manual Prep Time",
    },
  ],
  shake: [
    {
      id: "shakes",
      title: "Shakes",
      emoji: "🥤",
      defaultPrice: 4.75,
      defaultCost: 1.65,
      defaultSales: 55,
      defaultTaylorTime: 10,
      defaultCompetitorTime: 150,
      defaultEnabled: true,
      competitorLabel: "Blender Time",
    },
  ],
  cocktail: [
    {
      id: "cocktails",
      title: "Frozen Cocktails",
      emoji: "🍹",
      defaultPrice: 12.0,
      defaultCost: 3.0,
      defaultSales: 55,
      defaultTaylorTime: 10,
      defaultCompetitorTime: 120,
      defaultEnabled: true,
      competitorLabel: "Manual Mix Time",
    },
  ],
};

interface ProductState {
  enabled: boolean;
  price: number;
  cost: number;
  sales: number;
  taylorTime: number;
  competitorTime: number;
}

export default function CalculatorPage() {
  const [market, setMarket] = useState<Market>("soft_serve");
  const [equipment, setEquipment] = useState<string>("single");
  const [years, setYears] = useState<number>(5);
  const [products, setProducts] = useState<Record<string, ProductState>>({});

  // Initialize products when market changes
  useEffect(() => {
    const configs = productConfigs[market];
    const initial: Record<string, ProductState> = {};
    configs.forEach((p) => {
      initial[p.id] = {
        enabled: p.defaultEnabled,
        price: p.defaultPrice,
        cost: p.defaultCost,
        sales: p.defaultSales,
        taylorTime: p.defaultTaylorTime,
        competitorTime: p.defaultCompetitorTime,
      };
    });
    setProducts(initial);
    // Reset equipment to first option for new market
    setEquipment(Object.keys(equipmentData[market])[0]);
  }, [market]);

  const updateProduct = (id: string, field: keyof ProductState, value: number | boolean) => {
    setProducts((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // Calculate results
  const equipmentMultiplier = equipmentData[market][equipment]?.multiplier || 1;
  let totalDailyProfit = 0;
  let totalServings = 0;
  let weightedProfit = 0;

  Object.entries(products).forEach(([id, product]) => {
    if (product.enabled) {
      const profit = product.price - product.cost;
      const effectiveSales = product.sales * equipmentMultiplier;
      totalDailyProfit += profit * effectiveSales;
      totalServings += effectiveSales;
      weightedProfit += profit * effectiveSales;
    }
  });

  const avgProfitPerServing = totalServings > 0 ? weightedProfit / totalServings : 0;
  const annualProfit = totalDailyProfit * 250; // 250 working days
  const totalProfit = annualProfit * years;

  const formatCurrency = (value: number) =>
    "$" + Math.round(value).toLocaleString();

  // Get efficiency comparison for display
  const getEfficiencyComparison = () => {
    if (market === "soft_serve") {
      const cones = products.cones;
      const cups = products.cups;
      if ((cones?.enabled || cups?.enabled) && cones) {
        return {
          title: "Soft Serve vs Hard Ice Cream Speed",
          taylorLabel: "Taylor Soft Serve",
          competitorLabel: "Hard Ice Cream",
          taylorTime: cones.taylorTime,
          competitorTime: cones.competitorTime,
          color: "#10b981",
        };
      }
    } else if (market === "shake" && products.shakes?.enabled) {
      return {
        title: "Taylor Shake Efficiency vs Traditional Blending",
        taylorLabel: "Taylor Machine",
        competitorLabel: "Traditional Blender",
        taylorTime: products.shakes.taylorTime,
        competitorTime: products.shakes.competitorTime,
        color: "#8b5cf6",
      };
    } else if (market === "cocktail" && products.cocktails?.enabled) {
      return {
        title: "Taylor Direct Pour vs Manual Preparation",
        taylorLabel: "Taylor Direct Pour",
        competitorLabel: "Manual Preparation",
        taylorTime: products.cocktails.taylorTime,
        competitorTime: products.cocktails.competitorTime,
        color: "#f59e0b",
      };
    }
    return null;
  };

  const efficiency = getEfficiencyComparison();

  return (
    <>
      <Header />
      <main id="main-content" className="pt-[120px]">
        {/* Header */}
        <div className="bg-gradient-to-br from-[var(--blue-600)] to-[var(--navy-800)] text-white py-16 text-center">
          <div className="container">
            <h1 className="font-[family-name:var(--font-heading)] font-bold text-4xl md:text-5xl mb-4">
              Taylor Profit Calculator
            </h1>
            <p className="text-xl opacity-90">
              Discover your potential annual profits with premium Taylor equipment
            </p>
          </div>
        </div>

        <div className="bg-[var(--gray-50)] py-8">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
              {/* Left Column - Inputs */}
              <div className="space-y-8">
                {/* Market Selection */}
                <div>
                  <label className="block text-lg font-semibold text-[var(--navy-800)] mb-4">
                    Choose Your Market
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: "soft_serve", label: "🍦 Soft Serve" },
                      { id: "shake", label: "🥤 Shakes" },
                      { id: "cocktail", label: "🍹 Cocktails" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMarket(m.id as Market)}
                        className={`p-6 rounded-xl border-2 font-semibold text-lg transition-all ${
                          market === m.id
                            ? "border-[var(--blue-500)] bg-[var(--blue-500)] text-white"
                            : "border-[var(--gray-200)] bg-white hover:border-[var(--blue-500)]"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Equipment Selection */}
                <div>
                  <label className="block text-lg font-semibold text-[var(--navy-800)] mb-4">
                    Select Your Taylor Equipment
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(equipmentData[market]).map(([key, eq]) => (
                      <button
                        key={key}
                        onClick={() => setEquipment(key)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          equipment === key
                            ? "border-[var(--blue-500)] bg-[var(--blue-500)] text-white"
                            : "border-[var(--gray-200)] bg-white hover:border-[var(--blue-500)]"
                        }`}
                      >
                        <div className="relative w-20 h-20 mx-auto mb-3">
                          <Image
                            src={eq.image}
                            alt={eq.name}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                        <div className="font-semibold text-sm">{eq.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Products */}
                <div className="space-y-4">
                  {productConfigs[market].map((config) => {
                    const product = products[config.id];
                    if (!product) return null;

                    return (
                      <div
                        key={config.id}
                        className={`bg-white rounded-xl border-2 border-[var(--gray-200)] p-6 transition-opacity ${
                          !product.enabled ? "opacity-40" : ""
                        }`}
                      >
                        {/* Product Header */}
                        <label className="flex items-center gap-4 mb-6 p-4 bg-[var(--gray-50)] rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={product.enabled}
                            onChange={(e) =>
                              updateProduct(config.id, "enabled", e.target.checked)
                            }
                            className="w-6 h-6 rounded border-2 border-[var(--blue-500)] text-[var(--blue-500)] cursor-pointer"
                          />
                          <span className="text-xl font-bold text-[var(--navy-800)]">
                            {config.emoji} {config.title}
                          </span>
                        </label>

                        {/* Price/Cost/Sales Row */}
                        <div className="grid grid-cols-3 gap-6 mb-6">
                          <div>
                            <label className="block font-semibold text-[var(--gray-700)] mb-2">
                              Selling Price
                            </label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray-500)] font-semibold">
                                $
                              </span>
                              <input
                                type="number"
                                value={product.price}
                                onChange={(e) =>
                                  updateProduct(config.id, "price", parseFloat(e.target.value) || 0)
                                }
                                disabled={!product.enabled}
                                step="0.25"
                                className="w-full pl-8 pr-4 py-3 border-2 border-[var(--gray-300)] rounded-lg text-lg disabled:bg-[var(--gray-100)]"
                              />
                            </div>
                            <small className="text-[var(--gray-500)]">
                              Average: ${config.defaultPrice.toFixed(2)}
                            </small>
                          </div>
                          <div>
                            <label className="block font-semibold text-[var(--gray-700)] mb-2">
                              Cost per Serving
                            </label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray-500)] font-semibold">
                                $
                              </span>
                              <input
                                type="number"
                                value={product.cost}
                                onChange={(e) =>
                                  updateProduct(config.id, "cost", parseFloat(e.target.value) || 0)
                                }
                                disabled={!product.enabled}
                                step="0.05"
                                className="w-full pl-8 pr-4 py-3 border-2 border-[var(--gray-300)] rounded-lg text-lg disabled:bg-[var(--gray-100)]"
                              />
                            </div>
                            <small className="text-[var(--gray-500)]">Typical range</small>
                          </div>
                          <div>
                            <label className="block font-semibold text-[var(--gray-700)] mb-2">
                              Daily Sales
                            </label>
                            <input
                              type="number"
                              value={product.sales}
                              onChange={(e) =>
                                updateProduct(config.id, "sales", parseInt(e.target.value) || 0)
                              }
                              disabled={!product.enabled}
                              className="w-full px-4 py-3 border-2 border-[var(--gray-300)] rounded-lg text-lg disabled:bg-[var(--gray-100)]"
                            />
                            <small className="text-[var(--gray-500)]">Servings per day</small>
                          </div>
                        </div>

                        {/* Time Comparison Row */}
                        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[var(--gray-200)]">
                          <div>
                            <label className="block font-semibold text-[var(--gray-700)] mb-2">
                              Taylor Time (seconds)
                              <span
                                className="inline-block w-4 h-4 bg-[var(--blue-500)] text-white rounded-full text-xs text-center leading-4 ml-2 cursor-help"
                                title="Time to prepare with Taylor equipment"
                              >
                                ?
                              </span>
                            </label>
                            <input
                              type="number"
                              value={product.taylorTime}
                              onChange={(e) =>
                                updateProduct(config.id, "taylorTime", parseInt(e.target.value) || 1)
                              }
                              disabled={!product.enabled}
                              min="1"
                              className="w-full px-4 py-3 border-2 border-[var(--gray-300)] rounded-lg text-lg disabled:bg-[var(--gray-100)]"
                            />
                            <small className="text-[var(--gray-500)]">Per serving</small>
                          </div>
                          <div>
                            <label className="block font-semibold text-[var(--gray-700)] mb-2">
                              {config.competitorLabel} (seconds)
                              <span
                                className="inline-block w-4 h-4 bg-[var(--blue-500)] text-white rounded-full text-xs text-center leading-4 ml-2 cursor-help"
                                title="Traditional preparation time"
                              >
                                ?
                              </span>
                            </label>
                            <input
                              type="number"
                              value={product.competitorTime}
                              onChange={(e) =>
                                updateProduct(config.id, "competitorTime", parseInt(e.target.value) || 1)
                              }
                              disabled={!product.enabled}
                              min="1"
                              className="w-full px-4 py-3 border-2 border-[var(--gray-300)] rounded-lg text-lg disabled:bg-[var(--gray-100)]"
                            />
                            <small className="text-[var(--gray-500)]">Traditional method</small>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pricing Tips - Only for soft serve */}
                {market === "soft_serve" && (
                  <div className="bg-blue-50 border-2 border-[var(--blue-400)] rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-[var(--navy-800)] mb-4">
                      💡 Pricing Tip: Add-On Recommendations
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg">
                        <strong className="text-[var(--blue-600)]">Flavor Burst:</strong> Add $0.50
                        to your base cone price
                        <div className="text-sm text-[var(--gray-500)] mt-1">
                          Simplifies register transactions
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <strong className="text-[var(--blue-600)]">CrunchiCreme:</strong> Add $1.00
                        to your base cone price
                        <div className="text-sm text-[var(--gray-500)] mt-1">
                          Premium topping upgrade
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Timeline Selector */}
                <div>
                  <label className="block text-lg font-semibold text-[var(--navy-800)] mb-4">
                    Projection Timeline
                  </label>
                  <div className="flex gap-4">
                    {[1, 5, 8, 10].map((y) => (
                      <button
                        key={y}
                        onClick={() => setYears(y)}
                        className={`flex-1 py-4 rounded-xl border-2 font-semibold text-lg transition-all ${
                          years === y
                            ? "border-[var(--blue-500)] bg-[var(--blue-500)] text-white"
                            : "border-[var(--gray-200)] bg-white hover:border-[var(--blue-500)]"
                        }`}
                      >
                        {y} Year{y > 1 ? "s" : ""}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="lg:sticky lg:top-[140px] lg:self-start">
                {/* Efficiency Comparison */}
                {efficiency && (
                  <div
                    className="rounded-xl p-5 mb-5 text-white"
                    style={{ background: efficiency.color }}
                  >
                    <h3 className="text-lg font-bold text-center mb-4">{efficiency.title}</h3>
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                      <div className="bg-white/95 text-[var(--navy-800)] p-4 rounded-lg text-center">
                        <div
                          className="text-sm font-semibold mb-2"
                          style={{ color: efficiency.color }}
                        >
                          {efficiency.taylorLabel}
                        </div>
                        <div className="text-2xl font-bold" style={{ color: efficiency.color }}>
                          {efficiency.taylorTime} sec
                        </div>
                        <div className="text-xs text-[var(--gray-500)] mb-2">per serving</div>
                        <div className="text-xl font-bold" style={{ color: efficiency.color }}>
                          {Math.round(3600 / efficiency.taylorTime)}
                        </div>
                        <div className="text-xs text-[var(--gray-500)]">servings/hour</div>
                      </div>
                      <div className="text-xl font-bold">VS</div>
                      <div className="bg-white/95 text-[var(--navy-800)] p-4 rounded-lg text-center">
                        <div className="text-sm font-semibold mb-2 text-red-500">
                          {efficiency.competitorLabel}
                        </div>
                        <div className="text-2xl font-bold text-red-500">
                          {efficiency.competitorTime >= 60
                            ? `${(efficiency.competitorTime / 60).toFixed(1)} min`
                            : `${efficiency.competitorTime} sec`}
                        </div>
                        <div className="text-xs text-[var(--gray-500)] mb-2">per serving</div>
                        <div className="text-xl font-bold text-red-500">
                          {Math.round(3600 / efficiency.competitorTime)}
                        </div>
                        <div className="text-xs text-[var(--gray-500)]">servings/hour</div>
                      </div>
                    </div>
                    <div className="text-center mt-4 font-bold text-lg bg-white/20 py-2 rounded-lg">
                      {(efficiency.competitorTime / efficiency.taylorTime).toFixed(1)}x FASTER!
                    </div>
                  </div>
                )}

                {/* Profit Results */}
                <div className="bg-gradient-to-br from-[var(--navy-700)] to-[var(--blue-600)] text-white rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-5">💰 Your Profit Potential</h2>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold mb-2">{formatCurrency(totalProfit)}</div>
                    <div className="opacity-90">Total {years}-Year Profit</div>
                  </div>

                  <div className="bg-white/15 rounded-xl p-5 mb-5 space-y-3">
                    <div className="flex justify-between">
                      <span>Avg profit/serving:</span>
                      <span>${avgProfitPerServing.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily sales:</span>
                      <span>{Math.round(totalServings)} servings</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily profit:</span>
                      <span>{formatCurrency(totalDailyProfit)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual profit:</span>
                      <span>{formatCurrency(annualProfit)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-white/30 font-semibold">
                      <span>{years}-Year total profit:</span>
                      <span>{formatCurrency(totalProfit)}</span>
                    </div>
                  </div>

                  <div className="bg-white/15 rounded-xl p-4 text-center">
                    🚀 Taylor equipment helps you serve customers efficiently
                  </div>

                  <a
                    href="/meet-your-salesperson"
                    className="block mt-5 w-full py-4 bg-gradient-to-r from-[var(--orange-500)] to-[var(--red-500)] text-white text-center font-semibold text-lg rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Talk to a Taylor Specialist
                  </a>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-center text-sm text-[var(--gray-500)] mt-8">
              * These calculations are estimates for illustrative purposes only. Actual profits
              will vary based on location, seasonality, and operating costs. Based on 250 operating
              days per year.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
