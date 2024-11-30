import BentoBox from "../base/bento-box";
import FullScreenPage from "../base/full-page";
import {useNavigate} from "react-router-dom";
import {registeredBlogs} from "./blogs/blog-registry";
import {rangesTo} from "../utils/types";


const BlogListing = () => {
    const navigate = useNavigate();
    const blogAsBentoboxList = rangesTo(registeredBlogs, (blog)=>{return blog.bentobox();});

    const handleCardClick = (path) => {
        navigate(path);
    };
    return (
        <div className="flex flex-col">
            {/* BentoBox with Cards */}
            <FullScreenPage
                title="Blogs"
                name="blog"
                children={<BentoBox items={blogAsBentoboxList} itemHeight={210} onClick={handleCardClick}/>}
            />
        </div>
    );
};

export default BlogListing;