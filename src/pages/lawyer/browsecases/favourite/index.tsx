/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchBar from "@/components/sections/lawyer/browsecases/searchBar";
import CardBrowseCases from "@/components/sections/lawyer/browsecases/card";
import { useGetFavouriteCasesQuery } from "@/hooks/useCaseQueries";
import Spinner from "@/components/common/spinner";

export default function FavouritePage() {

const { data, isLoading } = useGetFavouriteCasesQuery({
  params: { limit: 10, page: 1 },
});


  const tabBar = [{
    id: 1,
    name: "Most Recent",
    active: false,
    link: "/lawyer/browse-cases/most-recent"
  }, {
    id: 2,
    name: "Best Matches",
    active: false,
    link: "/lawyer/browse-cases/best-matches"
  }, {
    id: 1,
    name: "Favourite",
    active: true,
    link: "/lawyer/browse-cases/favourite"
  }];

  return (
    <>

      {/* Search & Filters */}
      <SearchBar tabBar={tabBar} />

      {/* Cases Grid */}
      <div className="w-full h-[677px] relative bg-white rounded-2xl overflow-auto p-[14px]">


        {isLoading && (
          <div className="flex h-full items-center justify-center w-full">
            <Spinner />
          </div>
        )}
        {(!data || data.length === 0) && !isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-slate-500 text-sm font-medium">
              There are no issues currently available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.map((item:any) => (
              <CardBrowseCases key={item.id} Item={item?.case} />
            ))}



          </div>
        )}
      </div>
    </>
  );
}
