import React from 'react'
import './Pagination.scss'
import * as ReactPaginateImport from 'react-paginate';
const ReactPaginate = ReactPaginateImport.default?.default

const Pagination = ({count, limit, onPageChange, currentPage}) => {

  const pageCount = Math.ceil(count / limit);

  return (
    <>
    <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event)=>onPageChange(event.selected+1)}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default Pagination