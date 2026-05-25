interface EmptyStateProps {
  hasFilters?: boolean;
}

export default function EmptyState({ hasFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl mb-4">📋</div>
      <h3 className="text-lg font-semibold text-fg mb-2">
        {hasFilters ? "没有符合条件的结果" : "暂无岗位数据"}
      </h3>
      <p className="text-sm text-muted max-w-sm">
        {hasFilters
          ? "尝试调整筛选条件，或清除筛选查看全部岗位。"
          : "数据库还没有岗位数据，请先运行爬虫。"}
      </p>
    </div>
  );
}
