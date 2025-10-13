import Spinner from "@/components/common/spinner"
import CardBrowseCases from "../browsecases/card"
import { useGetCasesQuery } from "@/hooks/useCaseQueries";


const RecentCasesSection = () => {
    const { data, isLoading } = useGetCasesQuery({
        filters: { status: "PENDING" },
    });
    return (
        <div className="w-full flex flex-col gap-[9px] bg-white rounded-2xl pt-[10px] pb-[20px] px-[20px]">
            <h3 className="justify-start text-neutral-800 text-xl font-bold font-['Manrope'] leading-loose tracking-tight">Recent Cases</h3>




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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {data?.map((item) => (
                        <CardBrowseCases key={item.id} Item={item} />
                    ))}



                </div>
            )}
        </div>
    )
}

export default RecentCasesSection;

