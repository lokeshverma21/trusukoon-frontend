import PageBreadcrumb from '@/components/admin/PageBreadcrumb'
import ServicesTable from '@/components/admin/services/ServicesTable'
import React from 'react'

function page() {
  return (
    <div>
      <PageBreadcrumb
        title="Services"
        name="Services"
        breadCrumbItems={[
          { label: "Home", href: "/" },
          { label: "Admin", href: "/admin" },
          { label: "Services" },
        ]}
      />
      <ServicesTable/>
    </div>
  )
}

export default page