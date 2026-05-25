export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b border-border bg-card/80 backdrop-blur-sm h-14" />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="mb-6 animate-pulse">
          <div className="h-6 w-32 bg-border rounded mb-2" />
          <div className="h-4 w-48 bg-border rounded" />
        </div>
        <div className="flex gap-4 mb-6 animate-pulse">
          <div className="flex-1 h-10 bg-border rounded-lg" />
          <div className="flex-1 h-10 bg-border rounded-lg" />
        </div>
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5">
              <div className="h-5 w-2/3 bg-border rounded mb-2" />
              <div className="h-4 w-1/3 bg-border rounded mb-3" />
              <div className="h-4 w-full bg-border rounded mb-2" />
              <div className="h-4 w-3/4 bg-border rounded" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
