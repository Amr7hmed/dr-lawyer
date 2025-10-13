import SearchBar from "@/components/sections/lawyer/browsecases/searchBar";
import CardBrowseCases from "@/components/sections/lawyer/browsecases/card";
import { useGetBestMatchesCasesQuery } from "@/hooks/useCaseQueries";
import Spinner from "@/components/common/spinner";
import { useAuthStore } from "@/store/authStore";
import { useShallow } from "zustand/shallow";

export default function BestMatchesPage() {

const { data, isLoading } = useGetBestMatchesCasesQuery({
  params: { limit: 10, page: 1 },
});
  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    })),
  );


  console.log("user>>",user);
  

  const tabBar = [{
    id: 1,
    name: "Most Recent",
    active: false,
    link: "/lawyer/browse-cases/most-recent"
  }, {
    id: 2,
    name: "Best Matches",
    active: true,
    link: "/lawyer/browse-cases/best-matches"
  }, {
    id: 1,
    name: "Favourite",
    active: false,
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
            {data?.map((item) => (
              <CardBrowseCases key={item.id} Item={item} />
            ))}



          </div>
        )}
      </div>
    </>
  );
}
