const DetailsSkeleton = () => {
  return (
    <div className="min-w-screen min-h-screen bg-black">
      <div className="flex w-full flex-col items-center justify-center gap-8 pt-28 lg:flex-row lg:items-start">
        {/* title when medium breakpoint  */}
        <div className="h-10 w-[500px] animate-pulse rounded bg-gray-600 md:w-[600px] lg:hidden" />
        {/* images */}
        <div className="h-[400px] w-[300px] animate-pulse rounded bg-gray-600" />
        {/* CTA when medium breakpoint */}
        <div className="mx-auto block h-[50px] w-2/5 animate-pulse items-center justify-center rounded bg-gray-600 lg:hidden" />
        <div className="flex flex-col gap-4">
          {/* title when large breakpoint  */}
          <div className="mb-4 hidden h-10 w-[500px] animate-pulse rounded bg-gray-600 md:w-[600px] lg:block" />
          {/* synopsis  */}
          <div className="h-[300px] w-[500px] animate-pulse rounded bg-gray-600 md:w-[600px]" />
          {/* Text Details when medium breakpoint */}
          <div className="h-[200px] w-[500px] animate-pulse rounded bg-gray-600 md:w-[600px] lg:hidden" />
        </div>
      </div>
      {/* CTA Button when large breakpoint */}
      <div className="mx-auto my-8 hidden h-[50px] w-2/5 animate-pulse items-center justify-center rounded bg-gray-600 lg:block" />
      {/* Text Details when large breakpoint */}
      <div className="mx-auto my-8 hidden h-[200px] w-[950px] animate-pulse items-center justify-center rounded bg-gray-600 lg:block" />
    </div>
  );
};

export default DetailsSkeleton;
