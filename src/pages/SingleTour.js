import React, { useEffect } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBContainer,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getTour, getRelatedTours } from '../redux/features/tourSlice';
import Spinner from '../components/Spinner';
import RelatedTours from '../components/RelatedTours';
//import DisqusThread from '../components/DisqusThread';

const SingleTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tour, loading, relatedTours } = useSelector((state) => state.tour);
  const { id } = useParams();
  const tags = tour?.tags;

  useEffect(() => {
    tags && tags.length && dispatch(getRelatedTours(tags));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <MDBContainer style={{ marginTop: '200px' }}>
        <MDBCard className="mb-3 mt-5">
          {tour && tour.imageFile && (
            <MDBCardImage
              className="mt-5"
              position="top"
              style={{ width: '100%', maxHeight: '600px' }}
              src={tour.imageFile}
              alt={tour.title}
            />
          )}
          <MDBCardBody>
            <MDBBtn
              tag="a"
              color="none"
              style={{ float: 'left', color: '#000' }}
              onClick={() => navigate('/')}
            >
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                // style={{ float: 'left' }}
              />
            </MDBBtn>
            <h3>{tour.title}</h3>
            <span>
              <p className="text-start tourName">Created By: {tour.name}</p>
            </span>
            <div style={{ float: 'left' }}>
              <span className="text-start">
                {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: 'left', margin: '5px' }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(tour.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {tour.description}
            </MDBCardText>
          </MDBCardBody>
          <RelatedTours tourId={id} relatedTours={relatedTours} />
        </MDBCard>

        {/* {tour && (
          <DisqusThread
            id={id}
            title={tour.title ? tour.title : 'q'}
            path={`/tour/${id}`}
          />
        )} */}
      </MDBContainer>
    </>
  );
};

export default SingleTour;
