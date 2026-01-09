"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Plus,
  Trash2,
  Loader2,
  Search,
  X,
  Check,
} from "lucide-react";

interface County {
  id: number;
  name: string;
  state: string;
  salespersonId: number | null;
  salesperson: {
    id: number;
    firstName: string;
    lastName: string;
  } | null;
}

interface Salesperson {
  id: number;
  firstName: string;
  lastName: string;
}

const US_STATES = [
  { code: "NJ", name: "New Jersey" },
  { code: "PA", name: "Pennsylvania" },
  { code: "NY", name: "New York" },
  { code: "DE", name: "Delaware" },
];

export default function CountiesPage() {
  const [counties, setCounties] = useState<County[]>([]);
  const [salespeople, setSalespeople] = useState<Salesperson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterState, setFilterState] = useState<string>("");
  const [filterSalesperson, setFilterSalesperson] = useState<string>("");
  const [selectedCounties, setSelectedCounties] = useState<number[]>([]);
  const [isBulkAssigning, setIsBulkAssigning] = useState(false);

  // New county form
  const [showNewForm, setShowNewForm] = useState(false);
  const [newCountyName, setNewCountyName] = useState("");
  const [newCountyState, setNewCountyState] = useState("NJ");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [countiesRes, salespeopleRes] = await Promise.all([
        fetch("/api/admin/counties"),
        fetch("/api/admin/salespeople"),
      ]);

      if (countiesRes.ok) {
        const data = await countiesRes.json();
        setCounties(data.counties);
      }

      if (salespeopleRes.ok) {
        const data = await salespeopleRes.json();
        setSalespeople(data.salespeople);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateCounty(e: React.FormEvent) {
    e.preventDefault();
    if (!newCountyName.trim()) return;

    setIsCreating(true);
    try {
      const response = await fetch("/api/admin/counties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCountyName.trim(),
          state: newCountyState,
        }),
      });

      if (response.ok) {
        setNewCountyName("");
        setShowNewForm(false);
        loadData();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to create county");
      }
    } catch (error) {
      console.error("Create error:", error);
      alert("Failed to create county");
    } finally {
      setIsCreating(false);
    }
  }

  async function handleDeleteCounty(id: number) {
    if (!confirm("Delete this county?")) return;

    try {
      const response = await fetch(`/api/admin/counties/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadData();
      } else {
        alert("Failed to delete county");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete county");
    }
  }

  async function handleAssignCounty(countyId: number, salespersonId: number | null) {
    try {
      const response = await fetch(`/api/admin/counties/${countyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ salespersonId }),
      });

      if (response.ok) {
        loadData();
      } else {
        alert("Failed to assign county");
      }
    } catch (error) {
      console.error("Assign error:", error);
      alert("Failed to assign county");
    }
  }

  async function handleBulkAssign(salespersonId: number | null) {
    if (selectedCounties.length === 0) return;

    setIsBulkAssigning(true);
    try {
      const response = await fetch("/api/admin/counties/bulk", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          countyIds: selectedCounties,
          salespersonId,
        }),
      });

      if (response.ok) {
        setSelectedCounties([]);
        loadData();
      } else {
        alert("Failed to bulk assign counties");
      }
    } catch (error) {
      console.error("Bulk assign error:", error);
      alert("Failed to bulk assign counties");
    } finally {
      setIsBulkAssigning(false);
    }
  }

  function toggleCountySelection(id: number) {
    setSelectedCounties((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  const filteredCounties = counties.filter((county) => {
    const matchesSearch =
      !searchQuery ||
      county.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = !filterState || county.state === filterState;
    const matchesSalesperson =
      !filterSalesperson ||
      (filterSalesperson === "unassigned"
        ? !county.salespersonId
        : county.salespersonId?.toString() === filterSalesperson);

    return matchesSearch && matchesState && matchesSalesperson;
  });

  // Group counties by state
  const countiesByState = US_STATES.reduce(
    (acc, state) => {
      acc[state.code] = filteredCounties.filter((c) => c.state === state.code);
      return acc;
    },
    {} as Record<string, County[]>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--blue-500)]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[var(--blue-50)] rounded-xl">
            <MapPin className="w-6 h-6 text-[var(--blue-500)]" />
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)]">
              Territory Management
            </h1>
            <p className="text-[var(--gray-600)] mt-1">
              Manage counties and assign to salespeople ({counties.length}{" "}
              counties)
            </p>
          </div>
        </div>
        <Button variant="primary" onClick={() => setShowNewForm(true)}>
          <Plus className="w-4 h-4" />
          Add County
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[var(--gray-200)]">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gray-400)]" />
              <input
                type="text"
                placeholder="Search counties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[var(--gray-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="px-4 py-2 border border-[var(--gray-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent"
          >
            <option value="">All States</option>
            {US_STATES.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
          <select
            value={filterSalesperson}
            onChange={(e) => setFilterSalesperson(e.target.value)}
            className="px-4 py-2 border border-[var(--gray-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent"
          >
            <option value="">All Assignments</option>
            <option value="unassigned">Unassigned</option>
            {salespeople.map((sp) => (
              <option key={sp.id} value={sp.id.toString()}>
                {sp.firstName} {sp.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCounties.length > 0 && (
        <div className="bg-[var(--blue-50)] rounded-xl p-4 border border-[var(--blue-200)] flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-[var(--blue-500)]" />
            <span className="font-medium text-[var(--blue-700)]">
              {selectedCounties.length} counties selected
            </span>
            <button
              onClick={() => setSelectedCounties([])}
              className="ml-2 text-[var(--blue-500)] hover:text-[var(--blue-700)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--gray-600)]">Assign to:</span>
            <select
              onChange={(e) => {
                const value = e.target.value;
                if (value === "unassign") {
                  handleBulkAssign(null);
                } else if (value) {
                  handleBulkAssign(parseInt(value));
                }
              }}
              disabled={isBulkAssigning}
              className="px-3 py-1.5 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)]"
              defaultValue=""
            >
              <option value="" disabled>
                Select salesperson...
              </option>
              <option value="unassign">Unassign</option>
              {salespeople.map((sp) => (
                <option key={sp.id} value={sp.id.toString()}>
                  {sp.firstName} {sp.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* New County Form */}
      {showNewForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
          <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
            Add New County
          </h2>
          <form onSubmit={handleCreateCounty} className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <Input
                label="County Name"
                value={newCountyName}
                onChange={(e) => setNewCountyName(e.target.value)}
                placeholder="e.g., Essex"
                required
              />
            </div>
            <div className="w-40">
              <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">
                State
              </label>
              <select
                value={newCountyState}
                onChange={(e) => setNewCountyState(e.target.value)}
                className="w-full px-4 py-2 border border-[var(--gray-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)]"
              >
                {US_STATES.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-2">
              <Button type="submit" variant="primary" isLoading={isCreating}>
                <Plus className="w-4 h-4" />
                Add
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowNewForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Counties by State */}
      {US_STATES.map((state) => {
        const stateCounties = countiesByState[state.code];
        if (stateCounties.length === 0 && filterState && filterState !== state.code) {
          return null;
        }

        return (
          <div
            key={state.code}
            className="bg-white rounded-xl shadow-sm border border-[var(--gray-200)] overflow-hidden"
          >
            <div className="bg-[var(--gray-50)] px-6 py-3 border-b border-[var(--gray-200)]">
              <div className="flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-[var(--navy-800)]">
                  {state.name}
                </h2>
                <span className="text-sm text-[var(--gray-500)]">
                  {stateCounties.length} counties
                </span>
              </div>
            </div>

            {stateCounties.length === 0 ? (
              <div className="p-6 text-center text-[var(--gray-500)]">
                No counties found
              </div>
            ) : (
              <div className="divide-y divide-[var(--gray-100)]">
                {/* Select All Row */}
                <div className="px-6 py-2 bg-[var(--gray-50)] flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={
                      stateCounties.every((c) => selectedCounties.includes(c.id)) &&
                      stateCounties.length > 0
                    }
                    onChange={() => {
                      const stateIds = stateCounties.map((c) => c.id);
                      const allSelected = stateIds.every((id) =>
                        selectedCounties.includes(id)
                      );
                      if (allSelected) {
                        setSelectedCounties((prev) =>
                          prev.filter((id) => !stateIds.includes(id))
                        );
                      } else {
                        setSelectedCounties((prev) => [
                          ...new Set([...prev, ...stateIds]),
                        ]);
                      }
                    }}
                    className="w-4 h-4 rounded border-[var(--gray-300)] text-[var(--blue-500)]"
                  />
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wider font-medium">
                    Select all {state.name}
                  </span>
                </div>

                {stateCounties.map((county) => (
                  <div
                    key={county.id}
                    className="px-6 py-3 flex items-center gap-4 hover:bg-[var(--gray-50)]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCounties.includes(county.id)}
                      onChange={() => toggleCountySelection(county.id)}
                      className="w-4 h-4 rounded border-[var(--gray-300)] text-[var(--blue-500)]"
                    />
                    <div className="flex-1">
                      <span className="font-medium text-[var(--navy-800)]">
                        {county.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <select
                        value={county.salespersonId?.toString() || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          handleAssignCounty(
                            county.id,
                            value ? parseInt(value) : null
                          );
                        }}
                        className="px-3 py-1.5 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)]"
                      >
                        <option value="">Unassigned</option>
                        {salespeople.map((sp) => (
                          <option key={sp.id} value={sp.id.toString()}>
                            {sp.firstName} {sp.lastName}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleDeleteCounty(county.id)}
                        className="p-1.5 text-[var(--gray-400)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
