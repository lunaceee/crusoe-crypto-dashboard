import React, { useRef } from 'react'
import { useTable, useSortBy } from "react-table"

const Table = ({ columns, data }) => {
  const skipPageResetRef = useRef(true)

  const tableInstance = useTable({
    columns,
    data,
    autoResetSortBy: !skipPageResetRef.current // Stop table from automatically resetting
  }, useSortBy)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-11/12 sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-11/12 divide-y divide-gray-200" {...getTableProps()}>
              <thead className="bg-gray-50">
                {// Loop over the header rows
                  headerGroups.map(headerGroup => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {// Loop over the headers in each row
                        headerGroup.headers.map(column => (
                          // Apply the header cell props
                          <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider whitespace-normal">
                            <div className="flex gap-2 items-center">
                              <span>
                                {column.render('Header')}
                              </span>
                              <span>
                                {//add icon indicator for sorted columns
                                  column.isSorted
                                    ? column.isSortedDesc
                                      ? <svg width="10" height="10" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                      </svg>
                                      : <svg width="10" height="10" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                        <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                      </svg>
                                    : ''}
                              </span>
                            </div>
                          </th>
                        ))}
                    </tr>
                  ))}
              </thead>
              <tbody  {...getTableBodyProps()}>
                {// Loop over the table rows
                  rows.map(row => {
                    // Prepare the row for display
                    prepareRow(row)
                    return (
                      // Apply the row props
                      <tr className="bg-white" {...row.getRowProps()}>
                        {// Loop over the rows cells
                          row.cells.map(cell => {
                            // Apply the cell props
                            return (
                              <td className="w-8 px-6 py-4 text-sm font-medium text-gray-900" {...cell.getCellProps()}>
                                {cell.render('Cell')}
                              </td>
                            )
                          })}
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table;