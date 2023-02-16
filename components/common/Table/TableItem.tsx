const Header: React.FC = () => {
  return (
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
  );
};

export default Header;
