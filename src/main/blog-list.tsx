import AtomFullScreenContainer from "../atoms/atom-full-screen-container";
import {registeredBlogs} from "./blogs/blog-registry";
import {rangesTo} from "../common/math";
import {useNavigate} from "react-router-dom";
import AtomBentobox from "../atoms/atom-bentobox";


const BlogListing = () => {
    
    const navigate = useNavigate();
    
    const items = rangesTo(registeredBlogs, (blog) => {
        return {
            title: blog.title,
            description: blog.description,
            size: blog.cardSize,
            date: blog.date,
            image: blog.cover,
            isNew: blog.isNew,
            onClick: () => navigate(blog.path),
        }
    });
    
    return (
        <AtomFullScreenContainer
            title="Blogs"
            description={`A collection of blogs on various topics.
                            Simply my thoughts and experiences with tech and life.`}
            name="blog"
            children={
                <AtomBentobox
                    items={items}
                />
            }
        />
    );
};

export default BlogListing;