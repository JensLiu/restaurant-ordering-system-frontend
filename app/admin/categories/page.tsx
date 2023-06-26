import { getCategories } from '@/app/actions/menu'
import React, { use } from 'react'
import CategoryManagementClient from './CategoryManagementClient'

const getData = async () => {
    return await getCategories()
}

const CategoryManagement = () => {
    const categories = use(getData())
    return (
    <div>
        <CategoryManagementClient categories={categories} />
    </div>
  )
}

export default CategoryManagement