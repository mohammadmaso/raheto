"use client";

import BlogPost from '../../page'
import { useRouter, usePathname } from 'next/navigation'


const CategoryPage = () => {

    const pathname = usePathname()
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];

    console.log(pathname)
    return (
        <BlogPost categoryTitle={lastPart}/>
    )
}

export default CategoryPage