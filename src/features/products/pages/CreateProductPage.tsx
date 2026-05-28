import ProductForm from "../components/productForm"
export default function CreateProductPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-base font-medium text-content-primary">New product</h1>
        <p className="text-xs text-content-tertiary mt-0.5">
          Fill in the details below to create a new product
        </p>
      </div>
      <ProductForm />
    </div>
  )
}