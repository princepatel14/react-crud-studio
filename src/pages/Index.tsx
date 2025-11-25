import { useState } from "react";
import { Product, ProductFormData } from "@/types/product";
import { ProductForm } from "@/components/ProductForm";
import { ProductList } from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  // CREATE
  const handleCreate = (data: ProductFormData) => {
    const newProduct: Product = {
      ...data,
      id: crypto.randomUUID(),
    };
    setProducts([...products, newProduct]);
    setShowForm(false);
    toast.success("Product created successfully!");
  };

  // UPDATE
  const handleUpdate = (data: ProductFormData) => {
    if (!editingProduct) return;
    
    setProducts(
      products.map((p) =>
        p.id === editingProduct.id ? { ...data, id: editingProduct.id } : p
      )
    );
    setEditingProduct(null);
    setShowForm(false);
    toast.success("Product updated successfully!");
  };

  // DELETE
  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Product deleted successfully!");
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                CRUD Operations Demo
              </h1>
              <p className="text-muted-foreground">
                Learn Create, Read, Update, Delete with all input types
              </p>
            </div>
            {!showForm && (
              <Button onClick={() => setShowForm(true)} size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Add Product
              </Button>
            )}
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          {showForm && (
            <div className="lg:sticky lg:top-8 h-fit">
              <ProductForm
                product={editingProduct}
                onSubmit={editingProduct ? handleUpdate : handleCreate}
                onCancel={handleCancel}
              />
            </div>
          )}

          {/* List Section */}
          <div className={showForm ? "" : "lg:col-span-2"}>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Products ({products.length})
              </h2>
            </div>
            <ProductList
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
