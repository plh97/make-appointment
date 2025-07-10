import Calendar from '@/components/Calendar';

export function InvesterPage() {
  return (
    <Layout>
      <div className="flex h-full flex-col flex-1">
        <Calendar canDelete />
      </div>
    </Layout>
  );
}
