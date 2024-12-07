import {AtomCarousel} from "../atoms/atom-carousel";
import FullScreenPage from "../atoms/full-page";
import {registeredBlogs} from "./blogs/blog-registry";
import {rangesTo} from "../common/types";


const BlogListing = () => {
    const items = rangesTo(registeredBlogs, (blog) => {
        return blog.toCarouselItem();
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