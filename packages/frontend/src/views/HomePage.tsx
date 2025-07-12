import DemoApp from "@/components/Calendar";

export function HomePage() {
  return (
    <Layout>
      <div className="flex h-full flex-col flex-1">
        <DemoApp />
      </div>
    </Layout>
  );
}
