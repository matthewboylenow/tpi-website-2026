"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Navigation,
  Plus,
  Trash2,
  Loader2,
  GripVertical,
  ExternalLink,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  id: number;
  menuLocation: string;
  label: string;
  url: string;
  parentId: number | null;
  displayOrder: number;
  isExternal: boolean;
}

const MENU_LOCATIONS = [
  { id: "header_products", name: "Header - Products Dropdown" },
  { id: "header_service", name: "Header - Customer Service Dropdown" },
  { id: "header_main", name: "Header - Main Links" },
  { id: "footer_products", name: "Footer - Products" },
  { id: "footer_company", name: "Footer - Company" },
  { id: "footer_support", name: "Footer - Support" },
];

export default function NavigationEditorPage() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLocation, setActiveLocation] = useState(MENU_LOCATIONS[0].id);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ label: "", url: "", isExternal: false });

  // New item form
  const [showNewForm, setShowNewForm] = useState(false);
  const [newItem, setNewItem] = useState({
    label: "",
    url: "",
    isExternal: false,
  });
  const [isCreating, setIsCreating] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const response = await fetch("/api/admin/navigation");
      if (response.ok) {
        const data = await response.json();
        setItems(data.items);
      }
    } catch (error) {
      console.error("Failed to load navigation items:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const locationItems = items
    .filter((item) => item.menuLocation === activeLocation)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = locationItems.findIndex((item) => item.id === active.id);
      const newIndex = locationItems.findIndex((item) => item.id === over.id);

      const newOrder = arrayMove(locationItems, oldIndex, newIndex);

      // Update local state immediately for responsiveness
      const reorderedItems = newOrder.map((item, index) => ({
        ...item,
        displayOrder: index,
      }));

      setItems((prev) =>
        prev.map((item) => {
          const updated = reorderedItems.find((r) => r.id === item.id);
          return updated || item;
        })
      );

      // Save to server
      try {
        await fetch("/api/admin/navigation/reorder", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: reorderedItems.map((item) => ({
              id: item.id,
              displayOrder: item.displayOrder,
            })),
          }),
        });
      } catch (error) {
        console.error("Failed to save order:", error);
        loadItems(); // Reload on error
      }
    }
  }

  async function handleCreateItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newItem.label.trim() || !newItem.url.trim()) return;

    setIsCreating(true);
    try {
      const response = await fetch("/api/admin/navigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newItem,
          menuLocation: activeLocation,
          displayOrder: locationItems.length,
        }),
      });

      if (response.ok) {
        setNewItem({ label: "", url: "", isExternal: false });
        setShowNewForm(false);
        loadItems();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to create item");
      }
    } catch (error) {
      console.error("Create error:", error);
      alert("Failed to create item");
    } finally {
      setIsCreating(false);
    }
  }

  async function handleUpdateItem(id: number) {
    try {
      const response = await fetch(`/api/admin/navigation/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        setEditingId(null);
        loadItems();
      } else {
        alert("Failed to update item");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update item");
    }
  }

  async function handleDeleteItem(id: number) {
    if (!confirm("Delete this navigation item?")) return;

    try {
      const response = await fetch(`/api/admin/navigation/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadItems();
      } else {
        alert("Failed to delete item");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete item");
    }
  }

  function startEditing(item: NavigationItem) {
    setEditingId(item.id);
    setEditForm({
      label: item.label,
      url: item.url,
      isExternal: item.isExternal,
    });
  }

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
            <Navigation className="w-6 h-6 text-[var(--blue-500)]" />
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-[var(--navy-800)]">
              Navigation Editor
            </h1>
            <p className="text-[var(--gray-600)] mt-1">
              Manage header and footer navigation menus
            </p>
          </div>
        </div>
        <Button variant="primary" onClick={() => setShowNewForm(true)}>
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
      </div>

      {/* Menu Location Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-[var(--gray-200)] overflow-hidden">
        <div className="border-b border-[var(--gray-200)]">
          <div className="flex flex-wrap">
            {MENU_LOCATIONS.map((location) => (
              <button
                key={location.id}
                onClick={() => setActiveLocation(location.id)}
                className={cn(
                  "px-4 py-3 text-sm font-medium transition-colors border-b-2",
                  activeLocation === location.id
                    ? "border-[var(--blue-500)] text-[var(--blue-600)] bg-[var(--blue-50)]"
                    : "border-transparent text-[var(--gray-600)] hover:text-[var(--gray-900)] hover:bg-[var(--gray-50)]"
                )}
              >
                {location.name}
                <span className="ml-2 text-xs text-[var(--gray-400)]">
                  ({items.filter((i) => i.menuLocation === location.id).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* New Item Form */}
        {showNewForm && (
          <div className="p-4 bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
            <form onSubmit={handleCreateItem} className="flex items-end gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <Input
                  label="Label"
                  value={newItem.label}
                  onChange={(e) => setNewItem((p) => ({ ...p, label: e.target.value }))}
                  placeholder="Menu Label"
                  required
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <Input
                  label="URL"
                  value={newItem.url}
                  onChange={(e) => setNewItem((p) => ({ ...p, url: e.target.value }))}
                  placeholder="/page-url or https://..."
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="newExternal"
                  checked={newItem.isExternal}
                  onChange={(e) => setNewItem((p) => ({ ...p, isExternal: e.target.checked }))}
                  className="w-4 h-4 rounded border-[var(--gray-300)] text-[var(--blue-500)]"
                />
                <label htmlFor="newExternal" className="text-sm text-[var(--gray-600)]">
                  External
                </label>
              </div>
              <div className="flex gap-2">
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

        {/* Navigation Items List */}
        <div className="p-4">
          {locationItems.length === 0 ? (
            <div className="text-center py-12 text-[var(--gray-500)]">
              <Navigation className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No items in this menu yet.</p>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => setShowNewForm(true)}
              >
                <Plus className="w-4 h-4" />
                Add First Item
              </Button>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={locationItems.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {locationItems.map((item) => (
                    <SortableItem
                      key={item.id}
                      item={item}
                      isEditing={editingId === item.id}
                      editForm={editForm}
                      setEditForm={setEditForm}
                      onStartEdit={() => startEditing(item)}
                      onSaveEdit={() => handleUpdateItem(item.id)}
                      onCancelEdit={() => setEditingId(null)}
                      onDelete={() => handleDeleteItem(item.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-[var(--blue-50)] rounded-xl p-4 border border-[var(--blue-200)]">
        <p className="text-sm text-[var(--blue-700)]">
          <strong>Tip:</strong> Drag and drop items to reorder. External links will open in a new tab.
          Changes are saved automatically.
        </p>
      </div>
    </div>
  );
}

// Sortable Item Component
function SortableItem({
  item,
  isEditing,
  editForm,
  setEditForm,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: {
  item: NavigationItem;
  isEditing: boolean;
  editForm: { label: string; url: string; isExternal: boolean };
  setEditForm: React.Dispatch<React.SetStateAction<{ label: string; url: string; isExternal: boolean }>>;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 p-3 bg-white border border-[var(--gray-200)] rounded-lg",
        isDragging && "opacity-50 shadow-lg"
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="p-1 text-[var(--gray-400)] hover:text-[var(--gray-600)] cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      {isEditing ? (
        <div className="flex-1 flex items-center gap-3 flex-wrap">
          <input
            type="text"
            value={editForm.label}
            onChange={(e) => setEditForm((p) => ({ ...p, label: e.target.value }))}
            className="flex-1 min-w-[150px] px-3 py-1.5 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)]"
            placeholder="Label"
          />
          <input
            type="text"
            value={editForm.url}
            onChange={(e) => setEditForm((p) => ({ ...p, url: e.target.value }))}
            className="flex-1 min-w-[200px] px-3 py-1.5 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)]"
            placeholder="URL"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={editForm.isExternal}
              onChange={(e) => setEditForm((p) => ({ ...p, isExternal: e.target.checked }))}
              className="w-4 h-4 rounded border-[var(--gray-300)] text-[var(--blue-500)]"
            />
            External
          </label>
          <button
            onClick={onSaveEdit}
            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={onCancelEdit}
            className="p-1.5 text-[var(--gray-500)] hover:bg-[var(--gray-100)] rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[var(--navy-800)]">{item.label}</span>
              {item.isExternal && (
                <ExternalLink className="w-3.5 h-3.5 text-[var(--gray-400)]" />
              )}
            </div>
            <p className="text-sm text-[var(--gray-500)] truncate">{item.url}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onStartEdit}
              className="p-1.5 text-[var(--gray-500)] hover:text-[var(--blue-600)] hover:bg-[var(--blue-50)] rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 text-[var(--gray-500)] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
