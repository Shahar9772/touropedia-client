import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBIcon,
  MDBBtn,
  MDBTooltip,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { likeTour } from '../redux/features/tourSlice';

const CardTour = ({
  imageFile,
  description,
  title,
  tags,
  _id,
  name,
  likes,
}) => {
  const { user } = useSelector((state) => state.auth);
  const liked = likes.find((userId) => userId === user?.result?._id);

  const dispatch = useDispatch();

  const Likes = () => {
    if (liked) {
      return (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likes.length - 1} other people likes`}
            >
              {likes.length} Likes
            </MDBTooltip>
          ) : (
            `${likes.length} Like${likes.length > 1 ? 's' : ''}`
          )}
        </>
      );
    } else {
      return (
        <>
          <MDBIcon far icon="thumbs-up" />
          &nbsp;
          {likes.length > 1
            ? `${likes.length} Likes`
            : likes.length === 1
            ? '1 Like'
            : 'Like'}
        </>
      );
    }
  };

  const handleLike = () => {
    dispatch(likeTour(_id));
  };

  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + '...';
    }

    return str;
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: '20rem' }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: '100%', height: '180px' }}
        />
        <div className="top-left">{name}</div>
        {/* <div className="bottom-right">
          <MDBIcon
            type="button"
            {...(liked ? { fas: true } : { far: true })}
            icon="heart"
            onClick={user?.result ? handleLike : null}
          />
          <span className="ms-2 like-count">{likes.length} Likes</span>
        </div> */}
        <span className="text-start tag-card">
          {tags.map((tag, index) => (
            <Link key={index} to={`/tours/tag/${tag}`}>
              {' '}
              #{tag}
            </Link>
          ))}
          <MDBBtn
            className="me-1"
            style={{ float: 'right' }}
            tag="a"
            color="none"
            onClick={user?.result ? handleLike : null}
          >
            {user?.result ? (
              <Likes />
            ) : (
              <div>
                <MDBTooltip tag="a" title="Please login to like tour">
                  <Likes />
                </MDBTooltip>
              </div>
            )}
          </MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(description)}
            <Link to={`/tour/${_id}`}> Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;
