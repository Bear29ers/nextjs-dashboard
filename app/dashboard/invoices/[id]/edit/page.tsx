import type { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';

import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/edit-form';

type Props = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: 'Edit Invoices',
};

const Page: NextPage<Props> = async ({ params }) => {
  const id = params.id;
  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice!} customers={customers!} />
    </main>
  );
};

export default Page;
