import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminMarketingCouponsPage() {
  return (
    <AdminPlaceholder
      title="Coupons"
      summary="Configure discount codes with usage limits, validity windows, and product/category/club targeting."
      nextSteps={[
        'Implement code generation and validation rules.',
        'Attach coupon scope to categories, products, and clubs.',
        'Track redemption analytics and expiration alerts.',
      ]}
    />
  );
}
