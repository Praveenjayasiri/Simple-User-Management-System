import React, { useContext, useMemo } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../context/UserContext';
import './Styles/Dashboard.css';

// Global filter component for searching users
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <span>
      Search: {' '}
      <input
        value={globalFilter || ''}
        onChange={e => setGlobalFilter(e.target.value || undefined)}
        placeholder="Type to search..."
        className="form-control"
      />
    </span>
  );
};

const Dashboard = () => {
  // Accessing user data from context
  const { users } = useContext(UserContext);

  // Memoizing data and columns to optimize rendering
  const data = useMemo(() => users, [users]);
  const columns = useMemo(
    () => [
      { Header: 'Username', accessor: 'username' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Role', accessor: 'role' },
    ],
    []
  );

  // Initializing React Table hooks for pagination and global filtering
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 }, // Set initial page size to 5
    },
    useGlobalFilter,
    usePagination
  );

  // Destructuring state variables from React Table
  const { globalFilter, pageIndex } = state;

  // Ensure the page always contains exactly 5 rows, including padding with empty rows
  const filledPage = [...page];
  while (filledPage.length < 5) {
    filledPage.push({});
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Details</h2>
      
      {/* Global filter/search input */}
      <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      
      {/* Table displaying user data */}
      <div className="table-responsive mt-3">
        <table {...getTableProps()} className="table table-bordered table-hover">
          <thead className="table-dark">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th key={column.id} {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {/* Mapping over filledPage to ensure consistent row count */}
            {filledPage.map((row, index) => {
              if (!row.id) {
                // Render empty row if row doesn't have id (for padding)
                return (
                  <tr key={`empty-${index}`}>
                    <td colSpan={columns.length}>&nbsp;</td>
                  </tr>
                );
              }
              // Prepare row for rendering
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td key={cell.getCellProps().key} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-link">
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-link">
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
