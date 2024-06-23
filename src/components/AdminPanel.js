import React, { useContext, useState, useMemo } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../context/UserContext';
import './Styles/AdminPanel.css';

// Component for global filtering/searching
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

const AdminPanel = () => {
  // Access user data and actions from context
  const { users, addUser, updateUser, deleteUser } = useContext(UserContext);

  // State for new user form and editing existing user
  const [newUser, setNewUser] = useState({ username: '', email: '', role: '' });
  const [editingUser, setEditingUser] = useState(null);

  // State for validation error message
  const [error, setError] = useState(null);

  // Function to validate user input
  const validateForm = (user) => {
    if (!user.username || !user.email || !user.role) {
      setError('All fields are required');
      return false;
    }
    setError(null);
    return true;
  };

  // Handler for adding a new user
  const handleAddUser = (e) => {
    e.preventDefault();
    if (validateForm(newUser)) {
      addUser(newUser);
      setNewUser({ username: '', email: '', role: '' });
    }
  };

  // Handler for updating an existing user
  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (validateForm(editingUser)) {
      updateUser(editingUser.id, editingUser);
      setEditingUser(null);
    }
  };

  // Handler for editing a user (setting editingUser state)
  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  // Handler for input change (used in form inputs)
  const handleChange = (e, isEditing) => {
    const { id, value } = e.target;
    if (isEditing) {
      setEditingUser(prev => ({ ...prev, [id]: value }));
    } else {
      setNewUser(prev => ({ ...prev, [id]: value }));
    }
  };

  // Memoized data and columns for React Table
  const data = useMemo(() => users, [users]);
  const columns = useMemo(() => [
    { Header: 'Username', accessor: 'username' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Role', accessor: 'role' },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div>
          {/* Button to edit user */}
          <button className="btn btn-success me-2" onClick={() => handleEditUser(row.original)}>Update</button>
          {/* Button to delete user */}
          <button className="btn btn-danger" onClick={() => deleteUser(row.original.id)}>Delete</button>
        </div>
      ),
    },
  ], [deleteUser]);

  // React Table hooks for pagination and global filtering
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
  } = useTable({ columns, data, initialState: { pageSize: 5 } }, useGlobalFilter, usePagination);

  // Destructuring state variables
  const { globalFilter, pageIndex } = state;

  return (
    <div className="container mt-5">
      <h2 className="text-center">Admin Panel</h2>
      {/* Form for adding or updating user */}
      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="mb-4">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={editingUser ? editingUser.username : newUser.username}
            onChange={(e) => handleChange(e, !!editingUser)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={editingUser ? editingUser.email : newUser.email}
            onChange={(e) => handleChange(e, !!editingUser)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <input
            type="text"
            className="form-control"
            id="role"
            value={editingUser ? editingUser.role : newUser.role}
            onChange={(e) => handleChange(e, !!editingUser)}
          />
        </div>
        {/* Display error message if validation fails */}
        {error && <div className="alert alert-danger">{error}</div>}
        {/* Submit button for adding or updating user */}
        <button type="submit" className={`btn w-100 ${editingUser ? 'btn-success' : 'btn-primary'}`}>
          {editingUser ? 'Update User' : 'Add User'}
        </button>
        {/* Cancel button visible when editing user */}
        {editingUser && (
          <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => setEditingUser(null)}>
            Cancel
          </button>
        )}
      </form>
      {/* Divider line */}
      <hr/>
      {/* Global filter/search input */}
      <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      {/* Table for displaying users */}
      <div className="table-responsive mt-3">
        <table {...getTableProps()} className="table table-bordered table-hover">
          <thead className="table-dark">
            {/* Table header */}
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          {/* Table body */}
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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

export default AdminPanel;
