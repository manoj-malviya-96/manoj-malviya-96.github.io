import BentoBox from "../base/bento-box";
import FullScreenPage from "../base/full-page";


const blogPage = [
    {
        title: 'Cpp MultiThreading',
        date: 'Jan 15, 2024',
        description: 'Learn the basics of React and how to build scalable apps.',
        image: 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
        link: '/blog/exploring-react',
        size: 'large',
    },
    {
        title: 'Medium',
        date: 'Feb 10, 2024',
        description: 'Discover the best practices to write clean JavaScript code.',
        image: 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
        link: '/blog/javascript-best-practices',
        size: 'medium',
    },
    {
        title: 'Small',
        date: 'Mar 5, 2024',
        description: 'Understand when to use CSS Grid and Flexbox in your layouts.',
        image: 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
        link: '/blog/css-grid-vs-flexbox',
        size: 'small',
    },
    {
        title: 'Medium',
        date: 'Mar 5, 2024',
        description: 'Understand when to use CSS Grid and Flexbox in your layouts.',
        image: 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
        link: '/blog/css-grid-vs-flexbox',
        size: 'medium',
    },
    {
        title: 'Small',
        date: 'Mar 5, 2024',
        description: 'Understand when to use CSS Grid and Flexbox in your layouts.',
        image: 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
        link: '/blog/css-grid-vs-flexbox',
        size: 'small',
    },
    {
        title: 'Small',
        date: 'Mar 5, 2024',
        description: 'Understand when to use CSS Grid and Flexbox in your layouts.',
        image: 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
        link: '/blog/css-grid-vs-flexbox',
        size: 'small',
    },
];

const BlogPage = () => {
    return (
        <FullScreenPage
            title="Blog"
            name="blog"
            children={<BentoBox items={blogPage}/>}
        />
    );
};

export default BlogPage;