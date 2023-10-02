import React from 'react';
import { MDBBtn, MDBPagination, MDBPaginationItem } from 'mdb-react-ui-kit';

const Pagination = ({
  setCurrentPage,
  currentPage,
  numberOfPages,
  dispatch,
}) => {
  const PrevPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const NextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const renderPagination = () => {
    if (numberOfPages === 1 || numberOfPages === 0) {
      return null;
    } else if (currentPage === 1) {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <p className="fw-bold mt-1">{currentPage}</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn rounded className="mx-2" onClick={NextPage}>
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage !== numberOfPages) {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <MDBBtn rounded className="mx-2" onClick={PrevPage}>
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className="fw-bold mt-1">{currentPage}</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn rounded className="mx-2" onClick={NextPage}>
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <MDBBtn rounded className="mx-2" onClick={PrevPage}>
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className="fw-bold mt-1">{currentPage}</p>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return <div className="mt-4">{renderPagination()}</div>;
};

export default Pagination;
