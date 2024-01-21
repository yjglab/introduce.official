import { FC } from "react";

interface Props {
  section: any;
}

const Section: FC<Props> = ({ section }) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-2xl font-semibold dark:text-white'>{section.name}</h3>
      <p className='text-lg text-gray-800 dark:text-gray-200 break-words'>{section.description}</p>

      <div>
        {section.Keywords.map((keyword: any) => (
          <button
            type='button'
            className='m-1 border dark:border-gray-700 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
          >
            {keyword.name}
          </button>
        ))}
      </div>

      {section.Images.map((image: any) => (
        <figure key={image.src}>
          <img className='w-full object-cover rounded-xl' src={image.src} alt={image.src} />
          <figcaption className='mt-3 text-sm text-center text-gray-500'>{image.alt}</figcaption>
        </figure>
      ))}
    </div>
  );
};

export default Section;
