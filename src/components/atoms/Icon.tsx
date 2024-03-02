import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import {
  AiFillDelete,
  AiFillEdit,
  IoMdArrowBack,
  MdAdd,
  MdArchive,
  MdClose,
  MdFilterAlt,
  MdHome,
  MdListAlt,
  MdOutlineAccountCircle,
  MdStar,
  MdStarBorder,
  MdSync,
  MdUnarchive,
  FaBell,
  IoMdArrowForward,
  MdCalendarMonth,
  MdSettings,
  MdError,
  MdLogout,
  MdCopyAll,
  BiChevronDown, BiChevronRight
} from "react-icons/all";
import React, { CSSProperties } from "react";
import Skeleton from "@/components/atoms/Skeleton";

const iconMap = {
  loading: AiOutlineLoading3Quarters,
  home: MdHome,
  notification: FaBell,
  profile: MdOutlineAccountCircle,
  edit: AiFillEdit,
  archive: MdArchive,
  errors: MdError,
  copy: MdCopyAll,
  logout: MdLogout,
  unarchive: MdUnarchive,
  delete: AiFillDelete,
  add: MdAdd,
  settings: MdSettings,
  next: IoMdArrowForward,
  back: IoMdArrowBack,
  important: MdStar,
  unimportant : MdStarBorder,
  close: MdClose,
  chevronDown: BiChevronDown,
  chevronRight: BiChevronRight,
  calendar: MdCalendarMonth,
  filter: MdFilterAlt,
  list: MdListAlt,
  sync: MdSync,
};


type iconProps = {
    className?: string
    style?: CSSProperties
    spin?: boolean,
    loading?: boolean
}

export type IconType = keyof typeof iconMap;


export function getIconByName(name: IconType, { spin, className, loading = false,...rest }: iconProps = {}) {

  const IconComponent = iconMap[name];
  if (!IconComponent) {
    throw new Error(`Invalid icon name: "${name}"`);
  }

  if (spin) {
    className += ' animate-spin';
  }

  if (loading) {
    return <Skeleton size='medium' className={className} />;
  }

  return <IconComponent className={className} {...rest} />;
}