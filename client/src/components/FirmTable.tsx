import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import type { FC } from "react";
import { BASE_API } from "..";
import "./FirmTable.css";

function useFirms() {
	return useQuery<Firm[]>({
		queryKey: ["firms"],
		queryFn: () => fetch(`${BASE_API}/investors`).then((res) => res.json()),
		initialData: [],
		throwOnError: true,
		retry: false,
	});
}

const columnHelper = createColumnHelper<Firm>();

const columns = [
	columnHelper.accessor("firm_id", {
		header: () => <span>ID</span>,
		cell: (info) => info.renderValue(),
	}),
	columnHelper.accessor("firm_name", {
		header: () => <span>Name</span>,
		cell: (info) => info.renderValue(),
	}),
	columnHelper.accessor("firm_type", {
		header: () => <span>Type</span>,
		cell: (info) => info.renderValue(),
	}),
	columnHelper.accessor("date_added", {
		header: () => <span>Date Added</span>,
		cell: (info) => new Date(info.getValue()).toLocaleDateString("en-UK"),
	}),
	columnHelper.accessor("address", {
		header: () => <span>Address</span>,
		cell: (info) => info.renderValue(),
	}),
];

export const FirmTable: FC = () => {
	const { data } = useFirms();
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	const navigate = useNavigate({ from: "/" });

	function handleRowClick(firm_id: string) {
		navigate({ to: "/investors/$investorId", params: { investorId: firm_id } });
	}

	return (
		<div className="firm-table">
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr
							key={row.id}
							onClick={() => handleRowClick(row.getValue("firm_id"))}
							onKeyPress={() => handleRowClick(row.getValue("firm_id"))}
						>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
