const FilterDropdown: React.FC = () => {
  return (
    <div>
      <button
        id="dropdownRadioButton"
        data-dropdown-toggle="dropdownRadio"
        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        type="button"
      >
        <svg
          className="mr-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          ></path>
        </svg>
        Last 30 days
        <svg
          className="ml-2 h-3 w-3"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        id="dropdownRadio"
        className="z-10 hidden w-48 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
        data-popper-reference-hidden=""
        data-popper-escaped=""
        data-popper-placement="top"
        // style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(522.5px, 3847.5px, 0px);"
      >
        <ul
          className="space-y-1 p-3 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownRadioButton"
        >
          <li>
            <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="filter-radio-example-1"
                type="radio"
                value=""
                name="filter-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label
                htmlFor="filter-radio-example-1"
                className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Last day
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                checked={false}
                onChange={() => {}}
                id="filter-radio-example-2"
                type="radio"
                value=""
                name="filter-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label
                htmlFor="filter-radio-example-2"
                className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Last 7 days
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="filter-radio-example-3"
                type="radio"
                value=""
                name="filter-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label
                htmlFor="filter-radio-example-3"
                className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Last 30 days
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="filter-radio-example-4"
                type="radio"
                value=""
                name="filter-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label
                htmlFor="filter-radio-example-4"
                className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Last month
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="filter-radio-example-5"
                type="radio"
                value=""
                name="filter-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label
                htmlFor="filter-radio-example-5"
                className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Last year
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FilterDropdown;
