"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import type { SelectedMonthTransaction } from "../types";
import { currencyFormatter, formatDate } from "../utils/formatters";

const columnHelper = createColumnHelper<SelectedMonthTransaction>();

const columns = [
  columnHelper.accessor("payee", { header: "PAYEE" }),
  columnHelper.accessor("date", {
    header: "DATE",
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor("amount", {
    header: "AMOUNT",
    cell: (info) => currencyFormatter.format(info.getValue()),
  }),
  columnHelper.accessor("category", { header: "CATEGORY" }),
];

interface TransactionTableProps {
  selectedMonthTransactions: SelectedMonthTransaction[];
}

const TransactionTable = ({
  selectedMonthTransactions,
}: TransactionTableProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable<SelectedMonthTransaction>({
    data: selectedMonthTransactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-white text-xs border-none rounded-lg p-4 my-4">
      <h2 className="text-gray-400 font-semibold mb-4">
        TRANSACTIONS THIS MONTH
      </h2>

      <div className="border border-gray-200">
        <table className="text-left w-full border-collapse table-fixed text-[10px] font-semibold">
          <thead className="bg-slate-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-[#3a2bad] py-2 px-3">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2 px-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full text-center">
        {Array.from({ length: table.getPageCount() }, (_, i) => (
          <button
            key={`page-${i}`}
            onClick={() => table.setPageIndex(i)}
            className={`font-bold mx-2 ${table.getState().pagination.pageIndex === i ? "" : "underline"}
            `}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
