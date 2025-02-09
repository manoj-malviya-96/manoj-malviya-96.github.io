import React from "react";
import AtomSimpleMotionContainer from "./atom-simple-motion-container";
import { BentoBoxItemProps } from "./atom-bentobox";
import {
  AtomDateAndText,
  AtomSecondaryBadge,
  AtomSecondaryText,
  AtomTitleText,
} from "./atom-text";
import {
  AtomColumn,
  AtomRow,
  LayoutAlign,
  LayoutGap,
  LayoutSize,
} from "./atom-layout";

export interface AtomCardProps extends BentoBoxItemProps {
  image: string;
  title: string;
  description?: string;
  date?: string;
  onClick?: () => void;
  isNew?: boolean;
  className?: string;
  transparent?: boolean;
  category?: string;
}

export const AtomCard: React.FC<AtomCardProps> = React.memo(
  ({
    image,
    title,
    description,
    date,
    onClick,
    transparent = false,
    isNew = false,
    className = "",
  }) => {
    return (
      <AtomSimpleMotionContainer enableHoverEffect={true}>
        <AtomColumn
          onClick={onClick}
          size={LayoutSize.None}
          className={`${transparent ? "bg-transparent" : "bg-neutral bg-opacity-15 rounded-lg hover:shadow-lg"}
          cursor-pointer overflow-hidden p-0 transition ${className}`}
        >
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-2/3 object-cover"
          />
          <AtomColumn
            gap={LayoutGap.None}
            alignment={LayoutAlign.Start}
            size={LayoutSize.FullSize}
            className={"p-4"}
          >
            <AtomRow>
              <AtomTitleText>{title}</AtomTitleText>
              {isNew && <AtomSecondaryBadge>New</AtomSecondaryBadge>}
            </AtomRow>
            {date && <AtomDateAndText children={date} />}
            {description && <AtomSecondaryText children={description} />}
          </AtomColumn>
        </AtomColumn>
      </AtomSimpleMotionContainer>
    );
  },
);

export default AtomCard;
