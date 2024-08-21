const HeroSkeleton = () => {
  return (
    <div className="min-w-screen min-h-[90vh] bg-black">
      <div className="flex flex-col items-center justify-center gap-8 pt-28 md:items-start md:pl-20 md:pt-72 lg:flex-row lg:justify-start lg:pt-96">
        <div className="h-[300px] w-[200px] animate-pulse rounded bg-gray-600" />
        <div className="flex flex-col gap-4">
          <div className="h-10 w-[300px] animate-pulse rounded bg-gray-600 lg:w-[350px]" />
          <div className="hidden h-10 w-[150px] animate-pulse rounded bg-gray-600 lg:block lg:w-[200px]" />
          <div className="hidden h-32 w-[300px] animate-pulse rounded bg-gray-600 lg:block lg:w-[350px]" />
          <div className="h-10 w-[300px] animate-pulse rounded bg-gray-600 lg:w-[350px]" />
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
