import React from "react";

interface TableItemProps {
  row: (string | React.ReactNode)[];
  onRowClick?: (row: (string | React.ReactNode)[]) => void;
}

const TableItem: React.FC<TableItemProps> = ({ row, onRowClick }) => {
  return (
    <tr
      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
      onClick={() => onRowClick && onRowClick(row)}
    >
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-2"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
          />
          <label htmlFor="checkbox-table-search-2" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      {row.map((column, i) => (
        <React.Fragment key={Math.random()}>
          {typeof column === "string" ? (
            i === 0 ? (
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {column}
              </th>
            ) : (
              <td className="px-6 py-4">{column}</td>
            )
          ) : (
            <td key="last-element" className="px-6 py-4">
              {column}
            </td>
          )}
        </React.Fragment>
      ))}
    </tr>
  );
};

export default TableItem;
