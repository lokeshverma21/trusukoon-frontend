import PageBreadcrumb from '@/components/admin/PageBreadcrumb'
import ReportsPage from '@/components/admin/reports/ReportsPage'
import React from 'react'

function page() {
  return (
    <div>
      <PageBreadcrumb
        title="Reports & Insights"
        name="Reports & Insights"
        breadCrumbItems={[
          { label: "Home", href: "/" },
          { label: "Admin", href: "/admin" },
          { label: "Reports" },
      ]}/>
      <ReportsPage/>
    </div>
  )
}

export default page