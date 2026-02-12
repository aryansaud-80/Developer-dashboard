const PageHeader = ({ Icon, title, description, children }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
          <div
            className="flex shrink-0 rounded-lg p-3 items-center justify-center w-12 h-12"
            style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)" }}
          >
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              {title}
            </h2>
            <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
              {description}
            </p>
          </div>
        </div>
        {children && <div className="flex justify-start lg:justify-end w-full lg:w-auto">{children}</div>}
      </div>
      <div style={{ height: "1px", backgroundColor: "var(--border-color)" }} />
    </div>
  );
};

export default PageHeader;
