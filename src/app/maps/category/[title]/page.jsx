"use client";

import MapList from '@/components/maps'
import { useRouter, usePathname } from 'next/navigation'


const CategoryPage = () => {

    const pathname = usePathname()
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];

    console.log(pathname)
    return (
        <MapList categoryTitle={lastPart}/>
    )
}

export default CategoryPage