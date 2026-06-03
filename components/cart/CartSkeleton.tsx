import React from "react";

export const CartSkeleton = () => {
  return (
    <div className="grid animate-pulse gap-10 lg:grid-cols-[1fr_420px]">
      <div>
        <div className="mb-6 border-b border-neutral-200 pb-5">
          <div className="h-3 w-24 bg-neutral-200" />
          <div className="mt-3 h-8 w-48 bg-neutral-200" />
        </div>

        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {[1, 2].map((item) => (
            <div key={item} className="grid gap-5 py-6 sm:grid-cols-[140px_1fr]">
              <div className="aspect-square bg-neutral-200" />
              <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
                <div>
                  <div className="h-5 w-3/4 bg-neutral-200" />
                  <div className="mt-4 h-4 w-1/2 bg-neutral-200" />
                  <div className="mt-6 h-4 w-20 bg-neutral-200" />
                </div>
                <div className="flex flex-col gap-4 sm:items-end">
                  <div className="h-6 w-24 bg-neutral-200" />
                  <div className="h-11 w-36 bg-neutral-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-neutral-200 bg-[#f6f6f2] p-7">
        <div className="h-3 w-24 bg-neutral-200" />
        <div className="mt-3 h-8 w-32 bg-neutral-200" />
        <div className="mt-7 space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <React.Fragment key={item}>
              <div className="flex justify-between">
                <div className="h-4 w-28 bg-neutral-200" />
                <div className="h-4 w-20 bg-neutral-200" />
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="mt-7 h-12 w-full bg-neutral-300" />
        <div className="mt-3 h-12 w-full bg-neutral-200" />
      </div>
    </div>
  );
};
