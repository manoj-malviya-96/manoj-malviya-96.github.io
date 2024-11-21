import BentoBox from "../base/bento-box";
import FullScreenPage from "../base/full-page";
import {useNavigate} from "react-router-dom";
import AbstractRouter from "../base/router";
import routes from "./routes";


const blogs = [
    {
        id: 1,
        title: 'Cpp MultiThreading',
        date: 'Jan 15, 2024',
        description: 'Learn the basics of React and how to build scalable apps.',
        image: 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
        link: '/blog/exploring-react',
        size: 'large',
    },
    {
        id: 2,
        title: 'Medium',
        date: 'Feb 10, 2024',
        description: 'Discover the best practices to write clean JavaScript code.',
        image: 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
        link: '/blog/javascript-best-practices',
        size: 'medium',
    },
    {
        id: 3,
        title: 'Small',
        date: 'Mar 5, 2024',
        description: 'Understand when to use CSS Grid and Flexbox in your layouts.',
        image: 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
        link: '/blog/css-grid-vs-flexbox',
        size: 'small',
    },
];

const BlogListing = () => {
    const navigate = useNavigate();

    // Update only the blog-specific route
    const blogRoutes = routes.map((route) =>
        route.path === "/blog/:blogId" ? { ...route, props: { blogs } } : route
    );

    const handleCardClick = (card) => {
        navigate(card.link);
    };
    return (
        <div className="flex flex-col">
            {/* BentoBox with Cards */}
            <FullScreenPage
                title="Blog"
                name="blog"
                children={<BentoBox items={blogs} onClick={handleCardClick}/>}
            />
            {/* Router for Blog Pages */}
            <Router routes={blogRoutes}/>
        </div>
    );
};

export default BlogListing;