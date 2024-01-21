import { FC } from "react";

interface Props {
  section: any;
}

const Section: FC<Props> = ({ section }) => {
  return (
    <>
      <div className='space-y-3'>
        <h3 className='text-2xl font-semibold dark:text-white'>{section.name}</h3>
        <p className='text-lg text-gray-800 dark:text-gray-200 break-words'>{section.description}</p>
      </div>

      {section.Images.map((image: any) => (
        <figure key={image.src}>
          <img className='w-full object-cover rounded-xl' src={image.src} alt={image.src} />
          <figcaption className='mt-3 text-sm text-center text-gray-500'>{image.alt}</figcaption>
        </figure>
      ))}
    </>
  );
};

export default Section;
