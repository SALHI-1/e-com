import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="au-auth-wrap">
            <Link href="/" className="au-auth-logo">
                AURÉLIA
            </Link>
            <div className="au-auth-divider" />
            <div className="au-auth-card">
                {children}
            </div>
        </div>
    );
}
