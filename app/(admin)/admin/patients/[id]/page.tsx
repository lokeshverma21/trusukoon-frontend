import PageBreadcrumb from '@/components/admin/PageBreadcrumb'
import PatientDetailsPage from '@/components/admin/patient/PatientDetailsPage'
import React from 'react'

function page() {
  return (
    <>
        <PageBreadcrumb
            title="Patient's Detail"
            name="Patient's Detail"
            breadCrumbItems={[
            { label: "Home", href: "/" },
            { label: "Admin", href: "/admin" },
            { label: "Patients", href: "/admin/patients" },
            { label: "Patient's Detail",}
        ]}/>
        <PatientDetailsPage/>
    </>
  )
}

export default page