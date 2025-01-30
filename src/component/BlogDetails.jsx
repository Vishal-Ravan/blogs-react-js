import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.user); // Get token and user from Redux
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState(""); // For adding new comment
  const [reply, setReply] = useState(""); // For replying to an existing comment
  const [commentId, setCommentId] = useState(null); // To track which comment is being replied to
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        const data = await response.json();
        setBlog(data);
        setComments(data.comments || []); // Load existing comments
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleAddComment = async () => {
    if (!token) {
      // Redirect to login or show login modal
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
        body: JSON.stringify({ content: comment, blogId: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      const newComment = await response.json();
      setComments((prev) => [...prev, newComment]); // Add the new comment to the list
      setComment(""); // Clear the comment input
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAddReply = async (parentCommentId) => {
    if (!token) {
      // Redirect to login or show login modal
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
        body: JSON.stringify({ content: reply, commentId: parentCommentId, blogId: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to post reply");
      }

      const newReply = await response.json();
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === parentCommentId
            ? { ...comment, replies: [...comment.replies, newReply] }
            : comment
        )
      );
      setReply(""); // Clear the reply input
      setCommentId(null); // Reset the reply target
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-center">
          <img
            src={`${"http://localhost:5000"}${blog.image}`}
            alt="Blog"
            height={400}
            width={600}
          />
        </div>
        <h2 className="mt-4 mb-3">{blog?.title}</h2>
        <p>{blog?.content}</p>

        <div className="mt-5">
          <h3>Comments</h3>
          {comments.map((comment) => (
            <div key={comment._id} className="mb-3">
              <strong>{comment.user.name}:</strong> {comment.content}

              {/* Display replies */}
              <div className="ml-4">
                {comment.replies?.map((reply) => (
                  <div key={reply._id} className="mb-2">
                    <strong>{reply.user.name}:</strong> {reply.content}
                  </div>
                ))}
              </div>

              {/* Reply input */}
              {token && commentId === comment._id ? (
                <div className="mt-2">
                  <textarea
                    className="form-control"
                    placeholder="Add a reply"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => handleAddReply(comment._id)}
                  >
                    Post Reply
                  </button>
                </div>
              ) : (
                token && (
                  <button
                    className="btn btn-secondary mt-2"
                    onClick={() => setCommentId(comment._id)}
                  >
                    Reply
                  </button>
                )
              )}
            </div>
          ))}

          {/* Comment input */}
          {token ? (
            <div className="mt-3">
              <textarea
                className="form-control"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button className="btn btn-primary mt-2" onClick={handleAddComment}>
                Post Comment
              </button>
            </div>
          ) : (
            <p className="mt-3">
              <strong>You must be logged in to comment or reply.</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
