import React,{ FC } from "react";
import { Link } from "react-router-dom";


type TagsProps = {
    text: string
    url?: string
}

const Tag: FC<TagsProps> = ({ text, url }) => {

  const classNames = `inline-block bg-gray-200 rounded-full px-3 py-1 text-sm
   font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-100 mr-2 mb-2`;

  if (url) {
    return (<Link
      to={url}
      className={classNames}
      title={text}>
      {text}
    </Link>);
  }

  return (<span
    title={text}
    className={classNames}
  >{text}
  </span>);

};

export default Tag;