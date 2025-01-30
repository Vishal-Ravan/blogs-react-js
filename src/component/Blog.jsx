import React ,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from './redux/authSlice';
import { Link } from 'react-router-dom';

const Blog = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(blogs,'lklkl')
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
   <>
   <div class="container">
   <div class="container-wrap">
   {blogs.map((blog) => (
  <div class="card" key={blog._id}>
    <div class="card__header">
    <img src={`${"http://localhost:5000"}${blog.image}`} alt="" />
    </div>
    <div class="card__body">
      <span class="tag tag-blue">Technology</span>
     <Link to={`/blog-details/${blog._id}`}> <h4>{blog.title}</h4></Link>
      <p>{blog.content}</p>
    </div>
    <div class="card__footer">
      <div class="user">
        <img src="https://i.pravatar.cc/40?img=1" alt="user__image" class="user__image"/>
        <div class="user__info">
          <h5>Jane Doe</h5>
          <small>2h ago</small>
        </div>
      </div>
    </div>
  </div>
))}
  </div>
</div>
   </>
  )
}

export default Blog