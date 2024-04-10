import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";

function useFirms() {
    return useQuery<Firm[]>({
        queryKey: ['firms'],
        queryFn: () => fetch("http://localhost:8000/api/investors").then(res => res.json()),
        initialData: [],
        throwOnError: true,
        retry: false,
    })
}

export const FirmTable: FC = () => {
    const { data: firms } = useFirms()
    return (
        <div className="firm-table">
            {firms.map(firm => <>{firm.firm_name}</>)}
        </div>
    );
}