import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminSeoSettingsPage() {
  return (
    <AdminPlaceholder
      title="SEO Settings"
      summary="Control global metadata templates, sitemap behavior, redirects, and robots directives."
      nextSteps={[
        'Add editable robots and redirect manager UI.',
        'Provide JSON-LD schema preview by page type.',
        'Add validation checks before publishing SEO changes.',
      ]}
    />
  );
}
