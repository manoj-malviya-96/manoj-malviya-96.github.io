import React, { ReactNode, useCallback } from "react";
import { AtomColumn, LayoutAlign, LayoutGap } from "./atom-layout";
import AtomButton, { ButtonSize, ButtonType } from "./atom-button";

interface AtomTextProps {
  children?: ReactNode;
  className?: string;
}

export const AtomTertiaryText: React.FC<AtomTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <span className={`text-xs font-light opacity-70 ${className}`}>
      {children}
    </span>
  );
};

export const AtomSecondaryText: React.FC<AtomTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <span className={`font-light opacity-70 ${className}`}>{children}</span>
  );
};

export const AtomPrimaryText: React.FC<AtomTextProps> = ({
  children,
  className = "",
}) => {
  return <span className={`text-lg font-light ${className}`}>{children}</span>;
};

export const AtomBoldText: React.FC<AtomTextProps> = ({
  children,
  className = "",
}) => {
  return <span className={`font-bold ${className}`}>{children}</span>;
};

export const AtomSubtitleText: React.FC<AtomTextProps> = ({
  children,
  className = "",
}) => {
  return <h4 className={`text-3xl font-bold  ${className}`}>{children}</h4>;
};

export const AtomTitleText: React.FC<AtomTextProps> = ({
  children,
  className = "",
}) => {
  return <h3 className={`text-4xl font-extrabold ${className}`}>{children}</h3>;
};

export const AtomHeroTitleText: React.FC<AtomTextProps> = ({
  children,
  className = "",
}) => {
  return <h2 className={`text-6xl font-extrabold ${className}`}>{children}</h2>;
};

export const AtomSuperHeroTitleText: React.FC<AtomTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <h1
      className={`text-9xl font-extrabold uppercase text-center ${className}`}
    >
      {children}
    </h1>
  );
};

export const BrandGradient =
  "bg-gradient-to-r from-red-700 to-red-300 bg-clip-text text-transparent";

export const AtomHeroBrandTitleText: React.FC<AtomTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <h1 className={`text-5xl font-bold ${BrandGradient} ${className}`}>
      {children}
    </h1>
  );
};

export const AtomSuperHeroBrandTitleText: React.FC<AtomTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <h1
      className={`text-9xl font-extrabold uppercase ${BrandGradient} ${className}`}
    >
      {children}
    </h1>
  );
};

export interface AtomLinkProps extends AtomTextProps {
  url: string;
}

export const AtomLink: React.FC<AtomLinkProps> = ({
  children,
  url,
  className = "",
}) => {
  return (
    <a
      href={url}
      className={`text-primary-content hover:text-accent
                                    underline ${className}`}
    >
      {children}
    </a>
  );
};

export const AtomDateAndText: React.FC<AtomTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <span className={`opacity-70 ${className}`}>
      <i className="fas fa-calendar-days"></i> {children}
    </span>
  );
};

export const AtomAccentBadge: React.FC<AtomTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <span className={`badge badge-accent rounded-md ${className}`}>
      {children}
    </span>
  );
};

export const AtomPrimaryBadge: React.FC<AtomTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <span className={`badge badge-primary rounded-md ${className}`}>
      {children}
    </span>
  );
};

export const AtomSecondaryBadge: React.FC<AtomTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <span className={`badge badge-secondary rounded-md ${className}`}>
      {children}
    </span>
  );
};

interface AtomTextInputProps {
  text: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const AtomTextInput: React.FC<AtomTextInputProps> = React.memo(
  ({ text, onChange, placeholder = "", className = "" }) => {
    return (
      <input
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`input input-bordered ${className}`}
      />
    );
  },
);

interface AtomClippedTextProps {
  textComponentConstructor: (props: AtomTextProps) => React.ReactNode;
  fullText: string;
  maxLength: number;
  className?: string;
}

export const AtomClippedText: React.FC<AtomClippedTextProps> = React.memo(
  ({ textComponentConstructor, fullText, maxLength, className = "" }) => {
    const isClippedInitial = fullText.length > maxLength;
    const [clipped, setClipped] = React.useState(isClippedInitial);
    const [text, setText] = React.useState<string>(
      clipped ? fullText.slice(0, maxLength) + "..." : fullText,
    );

    React.useEffect(() => {
      setText(clipped ? fullText.slice(0, maxLength) + "... " : fullText);
    }, [fullText, maxLength, clipped]);

    const renderComponent = useCallback(() => {
      return textComponentConstructor({ children: text, className });
    }, [text, className, textComponentConstructor]);

    return (
      <AtomColumn gap={LayoutGap.None} alignment={LayoutAlign.Start}>
        {renderComponent()}
        {isClippedInitial && (
          <AtomButton
            pill={false}
            hoverEffect={false}
            type={ButtonType.Ghost}
            size={ButtonSize.Small}
            icon={clipped ? "fas fa-chevron-down" : "fas fa-chevron-up"}
            label={clipped ? "Show More" : "Show Less"}
            onClick={() => setClipped(!clipped)}
          />
        )}
      </AtomColumn>
    );
  },
);
