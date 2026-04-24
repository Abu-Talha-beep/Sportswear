import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminContentPagesPage() {
  return (
    <AdminPlaceholder
      title="CMS Pages"
      summary="Edit informational pages with rich content, media embedding, and SEO metadata controls."
      nextSteps={[
        'Connect to page data model with draft/publish states.',
        'Add rich text editor and media picker.',
        'Store per-page SEO title and description.',
      ]}
    />
  );
}
