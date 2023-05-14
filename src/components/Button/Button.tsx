import "./button.css";

interface IButton {
    bold?: boolean;

    border?: boolean;

    className?: string;

    disabled?: boolean;

    download?: string;

    fit?: boolean;

    hover?: boolean;

    href?: string;

    Icon?: React.ElementType;

    iconClassName?: string;

    italic?: boolean;

    onClick?: (e: unknown) => void;

    primary?: boolean;

    reverse?: boolean;

    secondary?: boolean;

    size?: "small" | "default" | "large";

    text?: string;

    textClassName?: string;

    thin?: boolean;

    type?: "button" | "submit" | "reset";

    uppercase?: boolean;

    vertical?: boolean;
}

/**
 *
 * @param bold if text should have weight=600 applied
 *
 * @param border if button should have applied border
 *
 * @param className general classname(s) to be applied to button
 *
 * @param disabled
 *
 * @param download if instead of navigating, the button should tell the browser to download a file to your device
 *
 * @param fit if button should downsize to fit its content and not occupy the whole container
 *
 * @param hover if a hover effect should be applied (useful with primary/secondary attributes)
 *
 * @param href link to navigate to (switches to anchor element)
 *
 * @param Icon React.Node Icon (for example passed from react-icons/fa library)
 *
 * @param iconClassName classname(s) to be applied to the icon
 *
 * @param italic if text should have style: italic; applied
 *
 * @param onClick custom function call on press
 *
 * @param primary if button's style should be primary (white color, red bg)
 *
 * @param reverse text-icon order instead of icon-text
 *
 * @param secondary if button's style should be secondary (red color, white bg)
 *
 * @param size small | default | large. Applies different padding to button
 *
 * @param text text within the button
 *
 * @param textClassName classname(s) to be applied to the text
 *
 * @param thin if text should have weight=300 applied
 *
 * @param type button | submit | reset
 *
 * @param uppercase if text should have text-transform: uppercase; applied
 *
 * @param vertical if flex-direction should be column
 *
 * @returns reusable Button component
 */
const Button = ({
    bold = false,
    border = true,
    className = "",
    disabled = false,
    download,
    fit = true,
    hover = false,
    href = "",
    Icon,
    iconClassName = "",
    italic = false,
    onClick = undefined,
    primary = false,
    reverse = false,
    secondary = false,
    size,
    text = "",
    textClassName = "",
    thin = false,
    type = "button",
    uppercase = false,
    vertical = false,
}: IButton): JSX.Element => {
    const ButtonTag = href ? "a" : "button";

    const buttonAttr = ButtonTag === "button" ? { type } : { download, href };

    const textClassnames = [
        "text",
        bold && !thin ? "w600" : "",
        thin && !bold ? "w300" : "",
        uppercase ? "uppercase" : "",
        italic ? "i" : "",
        textClassName,
    ];

    const buttonFlexClass = (vertical ? "column" : "row") + (reverse ? "-r" : "");

    const buttonClassnames = [
        "button flex",
        primary ? "primary" : "",
        secondary ? "secondary" : "",
        fit ? "fit-content" : "",
        hover ? "hover" : "",
        !border ? "noborder" : "",
        buttonFlexClass,
        size,
        className,
    ];

    return (
        <ButtonTag
            {...buttonAttr}
            className={buttonClassnames.join(" ")}
            disabled={disabled}
            onClick={onClick}
        >
            {!!Icon && <Icon className={iconClassName} />}

            <p className={textClassnames.join(" ")}>{text}</p>
        </ButtonTag>
    );
};

export default Button;
