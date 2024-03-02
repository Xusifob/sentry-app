import { FC } from "react";
import { getIconByName } from "@/components/atoms/Icon";

const Loader: FC<{ className?: string }>
    = ({ className }) => {
      return getIconByName('loading', { spin: true, className });
    };

export default Loader;