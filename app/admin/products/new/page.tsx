import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminNewProductPage() {
  return (
    <AdminPlaceholder
      title="Add Product"
      summary="Create full product entries including pricing, images, stock matrix, SEO metadata, and club assignment."
      nextSteps={[
        'Add full form fields from the blueprint: category, SKU, badges, media, and stock matrix.',
        'Connect form submit to your products API and validation schema.',
        'Enable CSV bulk import for stock updates.',
      ]}
    />
  );
}
