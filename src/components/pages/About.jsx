import { useEffect, useState } from 'react';
import CreatorCard from '../CreatorCard';
import './About.css';
import creatorsJson from '../../resources/creators.json';

function About() {
  const [creators, setCreators] = useState([]);

   useEffect(() => {
    // Import all images from assets folder
    const images = import.meta.glob('../../assets/*.{jpg,png,jpeg,svg}', { eager: true });
    
    const creatorsWithImages = creatorsJson.map(creator => {
      // Extract just the filename from the JSON path
      const filename = creator.src.split('/').pop();
      
      // Find matching image from glob import
      const imageKey = Object.keys(images).find(key => key.includes(filename));
      const imageSrc = imageKey ? images[imageKey].default : '';
      
      return { ...creator, src: imageSrc };
    });
    
    setCreators(creatorsWithImages);
  }, []);
  
  return (
    <div className='about-container'>
      <div className='about-header'>
        <h1>About Us</h1>
        <p className='about-intro'>
          Welcome to Badgerly Advice! We are dedicated to providing the best
          advice and resources for students of all majors at the University of
          Wisconsin-Madison. Our mission is to elevate the student experience at
          UW-Madison by offering valuable insights, tips, and support to help
          students navigate their academic and personal lives successfully.
        </p>
      </div>

      <hr className='separator' />
      <div className='creators-section'>
        {creators.map((creator, index) => {
          return (
            <CreatorCard
              key={index}
              name={creator.name}
              src={creator.src}
              description={creator.bio}
            />
          );
        })}
      </div>
    </div>
  );
}

export default About;
