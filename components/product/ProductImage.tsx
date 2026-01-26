import Image from "next/image"

interface Props {
    url: string;
    alt: string;
    width?: number;
    height?: number;
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const ProductImage = ({ url, alt, width, height, className, onMouseEnter, onMouseLeave }: Props) => {

    const customSrc =
        url
            ? (url.startsWith('http')
                ? url
                : '/products/' + url)
            : '/imgs/placeholder.jpg';

    return (
        <Image
            src={customSrc}
            alt={alt}
            width={width || 50}
            height={height || 50}
            className={`object-cover rounded ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    )
}
