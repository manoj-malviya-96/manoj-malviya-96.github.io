import BentoBox from "../base/bentobox";
import FullScreenPage from "../base/page";


const blogs = [
    {
        id: 1,
        title: 'Exploring React',
        date: 'Jan 15, 2024',
        description: 'Learn the basics of React and how to build scalable apps.',
        image: 'https://via.placeholder.com/300',
        link: '/blog/exploring-react',
        width: '300px',
        height: '300px',
    },
    {
        id: 2,
        title: 'JavaScript Best Practices',
        date: 'Feb 10, 2024',
        description: 'Discover the best practices to write clean JavaScript code.',
        image: 'https://via.placeholder.com/300',
        link: '/blog/javascript-best-practices',
        width: '160px',
        height: '160px',
    },
    {
        id: 3,
        title: 'CSS Grid vs Flexbox',
        date: 'Mar 5, 2024',
        description: 'Understand when to use CSS Grid and Flexbox in your layouts.',
        image: 'https://via.placeholder.com/300',
        link: '/blog/css-grid-vs-flexbox',
        width: '200px',
        height: '200px',
    },
    {
        id: 4,
        title: 'CSS Grid vs Flexbox',
        date: 'Mar 5, 2024',
        description: 'Understand when to use CSS Grid and Flexbox in your layouts.',
        image: 'https://via.placeholder.com/300',
        link: '/blog/css-grid-vs-flexbox',
        width: '400px',
        height: '300px',
    },
    {
        id: 5,
        title: 'CSS Grid vs Flexbox',
        date: 'Mar 5, 2024',
        description: 'Understand when to use CSS Grid and Flexbox in your layouts.',
        image: 'https://via.placeholder.com/300',
        link: '/blog/css-grid-vs-flexbox',
        width: '100px',
        height: '100px',
    },
    {
        id: 6,
        title: 'CSS Grid vs Flexbox',
        date: 'Mar 5, 2024',
        description: 'Understand when to use CSS Grid and Flexbox in your layouts.',
        image: 'https://via.placeholder.com/300',
        link: '/blog/css-grid-vs-flexbox',
        width: '100px',
        height: '100px',
    },
];

const BlogPage = () => {
    return (
        <FullScreenPage
            title="Blogs"
            name="blogs"
            children={<BentoBox blogs={blogs}/>}
        />
    );
};

export default BlogPage;