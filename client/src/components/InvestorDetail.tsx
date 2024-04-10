import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { type ChangeEvent, type FC, useState } from "react";
import { BASE_API } from "..";

function useFirms() {
	return useQuery<Firm[]>({
		queryKey: ["firms"],
		queryFn: () => fetch(`${BASE_API}/investors`).then((res) => res.json()),
		initialData: [],
		throwOnError: true,
		retry: false,
	});
}

const AssetClasses = [
	{ name: "Private Equity", value: "pe" },
	{ name: "Private Debt", value: "pd" },
	{ name: "Real Estate", value: "re" },
	{ name: "Infrastructure", value: "inf" },
	{ name: "Natural Resources", value: "nr" },
	{ name: "Hedge Funds", value: "hf" },
];

export const InvestorDetail: FC = () => {
	const [assetClass, setAssetClass] = useState(AssetClasses[0]);
	const { data } = useFirms();
	const params = useParams({ from: "/investors/$investorId" });
	const firm = data.find((item) => item.firm_id === Number(params.investorId));

	const { data: commitment } = useQuery({
		queryKey: ["commitment", assetClass.value, firm?.firm_id],
		queryFn: () =>
			fetch(
				`${BASE_API}/investor/commitment/${assetClass.value}/${firm?.firm_id}`,
			).then((res) => res.json()),
		enabled: !!firm,
		throwOnError: true,
		retry: false,
	});

	function handleAssetClassChange(event: ChangeEvent<HTMLSelectElement>) {
		const newClass = AssetClasses.find(
			(item) => item.value === event.target.value,
		);
		if (newClass) {
			setAssetClass(newClass);
		}
	}

	return (
		<div className="investor-detail">
			<select value={assetClass.value} onChange={handleAssetClassChange}>
				{AssetClasses.map((item) => (
					<option key={item.value} value={item.value}>
						{item.name}
					</option>
				))}
			</select>
		</div>
	);
};
