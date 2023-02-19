import FilterDropdown from "./FilterDropdown";
import Header from "./Header";
import SearchBar from "./SearchBar";
import TableItem from "./TableItem";

interface TableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  onRowClick?: (row: (string | React.ReactNode)[]) => void;
}

const Table: React.FC<TableProps> = ({ headers, rows, onRowClick }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2 pb-4 sm:flex-row sm:gap-0">
        <FilterDropdown />
        <SearchBar />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <Header headers={headers} />
          </thead>
          <tbody>
            {rows.map((row) => (
              <TableItem
                row={row}
                onRowClick={onRowClick}
                key={row.join("") + Math.random()}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
