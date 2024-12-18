import FullScreenPage from "../atoms/full-page";
import {registeredBlogs} from "./blogs/blog-registry";
import {rangesTo} from "../common/math";
import {useNavigate} from "react-router-dom";
import AtomCardGrid from "../atoms/atom-card-grid";


const BlogListing = () => {
    
    const navigate = useNavigate();
    
    const items = rangesTo(registeredBlogs, (blog) => {
        return {
            title: blog.title,
            description: blog.description,
            date: blog.date,
            image: blog.cover,
            isNew: blog.isNew,
            onClick: () => navigate(blog.path),
        }
    });
    
    return (
        <FullScreenPage
            title="Blogs"
            name="blog"
            children={<AtomCardGrid items={items}/>}
        />
    );
};

export default BlogListing;