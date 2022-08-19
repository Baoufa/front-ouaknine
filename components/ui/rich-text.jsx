import { PortableText } from '@portabletext/react';

import classes from './rich-text.module.scss'

export default function RichText({value}) {

  return (
    <PortableText
      value={value}
      components={{
        hardBreak: true,
        block: {
          // Ex. 1: customizing common block types
          normal: ({ children }) => {
            if (!children[0]) {
              return <br></br>;
            } else {
              return <p>{children}</p>;
            }
          }
        },
        listItem: {
          bullet : ({children}) => <li className={classes.bullet}>{children}</li>
        },

      }}
    />
  );
}
