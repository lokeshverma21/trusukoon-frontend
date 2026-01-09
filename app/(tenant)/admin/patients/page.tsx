import PageBreadcrumb from '@/components/admin/PageBreadcrumb'
import PatientsListPage from '@/components/admin/patient/PatientsListPage'
import React from 'react'

function page() {
  return (
    <>
      <PageBreadcrumb
        title="Patients"
        name="Patients"
        breadCrumbItems={[
          { label: "Home", href: "/" },
          { label: "Admin", href: "/admin" },
          { label: "Patients" },
      ]}/>
      <PatientsListPage/>
    </>
  )
}

export default page