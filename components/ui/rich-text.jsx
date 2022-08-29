import { PortableText } from '@portabletext/react';
import SanityImage from './sanityImage';
import classes from './rich-text.module.scss';

export default function RichText({ value }) {
  return (
    <PortableText
      value={value}
      onMissingComponent={(message, options) => {return
      }}
      components={{
        block: {
          // Ex. 1: customizing common block types
          normal: ({ children }) => {
            if (!children[0]) {
              return <br></br>;
            } else {
              return <p>{children}</p>;
            }
          },
          blockquote: ({ children }) => (
            <blockquote className={classes.blockquote}>{children}</blockquote>
          ),
        },
        types: {
          image: ({ value }) => {
            return (
              <div className={classes.img}>
                <SanityImage {...value} />
              </div>
            );
          },
        },
        listItem: {
          bullet: ({ children }) => (
            <li className={classes.bullet}>{children}</li>
          ),
          number:({ children }) => (
            <li>{children}</li>
          ),
        },
        marks: {
          link: ({ children, value }) => {
            const rel = !value?.href?.startsWith('/')
              ? 'noreferrer noopener'
              : undefined;
            return (
              // eslint-disable-next-line react/jsx-no-target-blank
              <a
                className={classes.link}
                href={value?.href ? value.href : '/'}
                rel={rel}
                target='_blank'
              >
                {children}
              </a>
            );
          },
        },
      }}
    />
  );
}
