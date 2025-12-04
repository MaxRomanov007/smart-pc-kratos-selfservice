import Link from "next/link";
import type {FC, PropsWithChildren} from 'react';

interface LinkBaseProps extends PropsWithChildren {
    href?: string;
    lng: string;
}

const LinkBase: FC<LinkBaseProps> = ({
    href = "",
    lng,
    children
}) => {
    return <Link href={`/${lng}/${href}`}>{children}</Link>
};

export default LinkBase;