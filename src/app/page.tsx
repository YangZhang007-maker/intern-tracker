import { Suspense } from "react";
import HomeContent from "./home-content";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-sage border-t-transparent" />
          <p className="text-sm text-muted mt-4">加载中...</p>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
