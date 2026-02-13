"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CalculatorPage() {
  const [servingsPerDay, setServingsPerDay] = useState<string>("100");
  const [pricePerServing, setPricePerServing] = useState<string>("4.00");
  const [costPerServing, setCostPerServing] = useState<string>("0.50");
  const [daysPerWeek, setDaysPerWeek] = useState<string>("7");

  const servings = parseFloat(servingsPerDay) || 0;
  const price = parseFloat(pricePerServing) || 0;
  const cost = parseFloat(costPerServing) || 0;
  const days = parseFloat(daysPerWeek) || 0;

  const profitPerServing = price - cost;
  const dailyRevenue = servings * price;
  const dailyCost = servings * cost;
  const dailyProfit = servings * profitPerServing;
  const weeklyProfit = dailyProfit * days;
  const monthlyProfit = weeklyProfit * 4.33;
  const yearlyProfit = dailyProfit * days * 52;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);

  return (
    <>
      <Header />
      <main id="main-content" className="pt-[120px] min-h-screen bg-[var(--gray-50)]">
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-[family-name:var(--font-heading)] font-bold text-3xl md:text-4xl text-[var(--navy-800)] mb-4">
                Profit Calculator
              </h1>
              <p className="text-[var(--gray-600)] max-w-2xl mx-auto">
                Calculate your potential profit from soft serve, frozen yogurt, and other frozen treat sales.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
                <h2 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-6">
                  Enter Your Numbers
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                      Servings Per Day
                    </label>
                    <input
                      type="number"
                      value={servingsPerDay}
                      onChange={(e) => setServingsPerDay(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--gray-300)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent text-lg"
                      min="0"
                    />
                    <p className="text-xs text-[var(--gray-500)] mt-1">
                      Estimate how many servings you&apos;ll sell daily
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                      Price Per Serving ($)
                    </label>
                    <input
                      type="number"
                      value={pricePerServing}
                      onChange={(e) => setPricePerServing(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--gray-300)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent text-lg"
                      min="0"
                      step="0.25"
                    />
                    <p className="text-xs text-[var(--gray-500)] mt-1">
                      What you charge customers per serving
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                      Cost Per Serving ($)
                    </label>
                    <input
                      type="number"
                      value={costPerServing}
                      onChange={(e) => setCostPerServing(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--gray-300)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent text-lg"
                      min="0"
                      step="0.05"
                    />
                    <p className="text-xs text-[var(--gray-500)] mt-1">
                      Your cost for mix, cups, and supplies
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                      Days Open Per Week
                    </label>
                    <input
                      type="number"
                      value={daysPerWeek}
                      onChange={(e) => setDaysPerWeek(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--gray-300)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent text-lg"
                      min="1"
                      max="7"
                    />
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                {/* Profit Per Serving */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
                  <div className="text-sm text-[var(--gray-600)] mb-1">Profit Per Serving</div>
                  <div className="text-3xl font-bold text-[var(--navy-800)]">
                    {formatCurrency(profitPerServing)}
                  </div>
                  <div className="text-sm text-[var(--gray-500)] mt-1">
                    {price > 0 ? ((profitPerServing / price) * 100).toFixed(0) : 0}% margin
                  </div>
                </div>

                {/* Daily Breakdown */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
                  <h3 className="font-semibold text-[var(--navy-800)] mb-4">Daily Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[var(--gray-600)]">Revenue</span>
                      <span className="font-medium">{formatCurrency(dailyRevenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--gray-600)]">Cost</span>
                      <span className="font-medium text-[var(--red-500)]">-{formatCurrency(dailyCost)}</span>
                    </div>
                    <div className="border-t border-[var(--gray-200)] pt-3 flex justify-between">
                      <span className="font-semibold text-[var(--navy-800)]">Daily Profit</span>
                      <span className="font-bold text-[var(--green-600)]">{formatCurrency(dailyProfit)}</span>
                    </div>
                  </div>
                </div>

                {/* Projected Profits */}
                <div className="bg-gradient-to-br from-[var(--blue-500)] to-[var(--navy-800)] rounded-xl p-6 text-white">
                  <h3 className="font-semibold mb-4">Projected Profits</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Weekly</span>
                      <span className="text-xl font-bold">{formatCurrency(weeklyProfit)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Monthly</span>
                      <span className="text-xl font-bold">{formatCurrency(monthlyProfit)}</span>
                    </div>
                    <div className="border-t border-white/20 pt-4 flex justify-between items-center">
                      <span className="text-blue-100">Yearly</span>
                      <span className="text-2xl font-bold">{formatCurrency(yearlyProfit)}</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-[var(--orange-50)] rounded-xl p-6 border border-[var(--orange-200)]">
                  <p className="text-[var(--gray-700)] mb-4">
                    Ready to start generating these profits? Talk to one of our specialists about the right machine for your business.
                  </p>
                  <a
                    href="/meet-your-salesperson"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--orange-500)] text-white font-semibold rounded-lg hover:bg-[var(--orange-600)] transition-colors"
                  >
                    Contact a Specialist
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-center text-sm text-[var(--gray-500)] mt-8">
              * These calculations are estimates for illustrative purposes only. Actual profits will vary based on location, seasonality, and operating costs.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
