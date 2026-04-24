import { Metadata } from 'next';
import { Accordion } from '@/components/ui/Accordion';
import { FAQItem } from '@/types';

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Frequently asked questions about ordering, delivery, returns, and custom kit from Your Club Stash.',
};

const faqs: FAQItem[] = [
  {
    question: 'How do I place an order for my club?',
    answer: 'Simply browse to your club shop page, select the items and sizes you need, and add them to your cart. You can then check out securely online. If your club isn\'t listed yet, contact us and we\'ll set you up.',
  },
  {
    question: 'Can I order custom kit with our club logo?',
    answer: 'Absolutely! Use our Stash Builder tool to design your custom kit, or contact us directly with your requirements. We can add club crests, sponsor logos, player names and numbers.',
  },
  {
    question: 'What is the minimum order quantity?',
    answer: 'There are no minimum order quantities for stocked items in club shops. For custom/bespoke orders, the minimum is typically 10 units per design.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery is 3-5 working days. Express delivery (1-2 working days) is available at checkout. Custom kit orders typically take 3-4 weeks from design approval.',
  },
  {
    question: 'Do you offer free delivery?',
    answer: 'Yes! We offer free standard delivery on all orders over £50. Express delivery is £7.99 regardless of order value.',
  },
  {
    question: 'What is your returns policy?',
    answer: 'We accept returns within 30 days of delivery for unworn, unwashed items in their original packaging. Custom/personalised items cannot be returned unless faulty. See our Returns Policy page for full details.',
  },
  {
    question: 'What sizes are available?',
    answer: 'Most items are available from XS to XXL. Junior sizes are also available for many products. Check individual product pages for specific size availability and refer to our Size Guide for measurements.',
  },
  {
    question: 'Do you plant a tree for every order?',
    answer: 'Yes! Through our partnership with ecologi, we plant one tree for every order placed. We\'ve planted over 10,000 trees so far and this number grows every day.',
  },
  {
    question: 'Can I set up a shop for my club?',
    answer: 'Definitely! We work with clubs of all sizes. Contact us and we\'ll discuss your requirements, set up a dedicated club shop page, and get your team kitted out.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Visa, Mastercard, Apple Pay, Google Pay, and PayPal. All payments are processed securely.',
  },
];

export default function FAQsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-primary uppercase">FAQs</h1>
        <p className="text-muted mt-3">Everything you need to know about ordering with Your Club Stash.</p>
      </div>
      <Accordion items={faqs} />
    </div>
  );
}
