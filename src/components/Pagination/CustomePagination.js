import React from 'react'
import Pagination from '@material-ui/lab/Pagination';

const CustomePagination = ({ count = 1, setCurrentPage }) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <Pagination count={count} color="secondary"
        size="large"
        onChange={(e) => setCurrentPage(e.target.innerText)} />
    </div>
  )
}

export default CustomePagination
