import { PortableText } from '@portabletext/react';

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
          },
        },
      }}
    />
  );
}
