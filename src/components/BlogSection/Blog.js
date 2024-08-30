
"use client";

import BlogCard from "./BlogCard";
import { StyledDiv, Container ,StyledH1} from "./BlogCard";
import MediaCard from "./MediaCard";
export default function Blog(){
    const blogs = [
        {
            id: 1,
            title: 'Blog Title 1',
            description: 'This is a short description of the first blog.',
            imageUrl: '/image.png',
            author:"Dr James",
            icon: '/images/blog1.jpg',
        },
        {
            id: 2,
            title: 'Blog Title 2',
            description: 'This is a short description of the second blog.',
            imageUrl: '/image.png',
            author:"Dr James",
            icon: '/images/blog1.jpg',
          
        },
        {
            id: 3,
            title: 'Blog Title 3',
            description: 'This is a short description of the third blog.',
            imageUrl: '/image.png',
            author:"Dr James",
            icon: '/images/blog1.jpg',
        },
    ];

    return (
      <>
    <Container>
    <StyledH1>Visit our blog</StyledH1>
     <StyledDiv>
      {blogs.map((blog) => (
          <MediaCard 
              key={blog.id}
              title={blog.title}
              cardImage={blog.imageUrl}
              cardDescription={blog.description}
              cardFooterText={blog.author}
          />
      ))}
      </StyledDiv>
     </Container>
      
  </>

    );
};

