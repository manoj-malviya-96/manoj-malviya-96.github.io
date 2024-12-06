import {AtomCarousel} from "../atoms/atom-carousel";
import FullScreenPage from "../atoms/full-page";
import {useNavigate} from "react-router-dom";
import {registeredBlogs} from "./blogs/blog-registry";
import {rangesTo} from "../utils/types";


const BlogListing = () => {
    const navigate = useNavigate();
    const items = rangesTo(registeredBlogs, (blog)=>{return blog.toCarouselItem();});

    const handleCardClick = (path) => {
        navigate(path);
    };
    return (
        <div className="flex flex-column w-fit h-full">
            {/* BentoBox with Cards */}
            <FullScreenPage
                title="Blogs"
                name="blog"
                children={<AtomCarousel items={items} onClick={handleCardClick}/>}
            />
        </div>
    );
};

export default BlogListing;