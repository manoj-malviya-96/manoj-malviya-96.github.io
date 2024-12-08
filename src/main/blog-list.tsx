import {AtomCarousel} from "../atoms/atom-carousel";
import FullScreenPage from "../atoms/full-page";
import {registeredBlogs} from "./blogs/blog-registry";
import {rangesTo} from "../common/types";
import {openLink} from "../common/links";
import {useNavigate} from "react-router-dom";


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
        <div className="flex flex-column w-fit h-full">
            {/* BentoBox with Cards */}
            <FullScreenPage
                title="Blogs"
                name="blog"
                children={<AtomCarousel items={items}/>}
            />
        </div>
    );
};

export default BlogListing;